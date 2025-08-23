"""
Main JobScrapper class for web scraping job listings.
"""
import time
from ..config.manager import get_configuration, create_empty_config
from .parsers.bs4_parser import get_bs4_obj_for_url, convert_html_source_to_bs4_obj, resolve_target_object
from .automation.selenium_driver import get_selenium_driver, simulate_browser_actions, run_operations_in_a_loop, wait_for_page_to_load_completely
from .parsers.text_parser import cut_target_fragment_from_total_text


class JobScrapper:
    """
    Main job scraper class that handles scraping job listings from various company career pages.
    """
    
    def __init__(self, company, test_mode=False):
        """
        Initialize the job scrapper.
        
        Args:
            company (str): Company name to scrape jobs from
            test_mode (bool): Whether to run in test mode (limits results)
        """
        self._company = company
        self._test_mode = test_mode

    def _extract_details_from_config(self):
        """Extract configuration details and set instance variables."""
        self._root_url = self._config["root_url"]
        self._nav_to_end_before_scraping = self._config.get("nav_to_end_before_scraping", False)
        self._wait_time_for_page_load_major = self._config.get("wait_until_load_major", None)
        self._wait_time_for_page_load_minor = self._config.get("wait_until_load_minor", None)
        self._fragment_additional_info = self._config.get("fragment_job_info_after_scraping", False)
        
        # job listing settings
        self._listing_scrape_settings = self._config["listing"]
        self._job_listing_scrape_settings = self._listing_scrape_settings["job_listing"]
        listing_url_tail = self._listing_scrape_settings.get("root_tail", "") 
        self._careers_url = f"{self._root_url}{listing_url_tail}".strip()
        self._fetch_mode = self._listing_scrape_settings.get("fetch_mode", 0) # fetch_mode = 0 is default

        # more info settings
        self._more_info_settings = self._config["more_info_object"]
        self._navigate_to_more_info_by = self._more_info_settings["navigate_by"]
        self._prepend_url = self._more_info_settings.get("prepend_root_to_url", False)
        self._wait_until_more_info_load = self._more_info_settings.get("wait_until_load", None)
        self._open_browser_before_fetching_additional_details = (not self._nav_to_end_before_scraping) and (self._navigate_to_more_info_by == "BROWSER_ACTION")

        # navigation to next page settings
        self._nav_to_next_page_settings = self._config["nav_to_next_page"]
        self._nav_to_next_page_by = self._nav_to_next_page_settings.get("navigate_by", "PARSE_HREF")
        self._end_of_navigation_marker = self._nav_to_next_page_settings.get("end_of_navigation_marker", {})

        # details settings
        self._details_settings = self._config["details"]
        self._fragment_additional_info = self._details_settings.get("fragment_additional_info", False)

    def _resolve_detailed_info(self, bs4_obj):
        """
        Extract detailed information from a BeautifulSoup object based on configuration.
        
        Args:
            bs4_obj: BeautifulSoup object to extract information from
            
        Returns:
            dict: Dictionary containing extracted job details
        """
        detailed_info = {}
        for item, value in self._details_settings.items():
            if item == "to_be_parsed":
                """
                This is a special key in which we define text fragments to be extracted.
                For some company job portals its not always straightforward to identify 
                the tags to parse from html. In these cases, we scrape all the necessary 
                information and store it in the key 'total_text' and then using these markers
                we split the total text into fragments. Since this needs special treatment
                this key will be skipped
                """
                continue
            try:
                target_obj = resolve_target_object(bs4_obj, value)
                final_txt = target_obj.text.strip() if target_obj else "No information available"
            except:
                final_txt = "No information available"
            detailed_info[item] = final_txt
            
        if not self._fragment_additional_info:
            # if splitting into fragments is not intended then exit
            return detailed_info
            
        to_be_parsed_settings = self._details_settings["to_be_parsed"]
        total_text = detailed_info["total_text"]
        for key_1, value_1 in to_be_parsed_settings.items():
            (start, end) = value_1
            try:
                # fragment is the text between start and end markers (usually sub headings)
                fragment = cut_target_fragment_from_total_text(total_text, start, end)
                detailed_info[key_1] = fragment
            except:
                break
        
        return detailed_info

    def _get_detailed_info_from_listing(self, listing_object, index):
        """
        Get detailed information for a single job listing.
        
        Args:
            listing_object: BeautifulSoup object for the listing
            index (int): Index of the listing
            
        Returns:
            dict: Dictionary containing detailed job information
        """
        if self._navigate_to_more_info_by == "PARSE_HREF":
            # fetch link to more info for each job posting by parsing href
            more_info_url = resolve_target_object(listing_object, self._more_info_settings).get("href", None)
            if self._prepend_url:
                more_info_url = f"{self._root_url}{more_info_url}"
            bs4_obj = get_bs4_obj_for_url(more_info_url)
        elif self._navigate_to_more_info_by == "BROWSER_ACTION":
            # navigate to more info for each job posting by browser action
            browser_actions = self._more_info_settings["browser_actions"]
            simulate_browser_actions(self._sd, browser_actions, self._wait_until_more_info_load, index_to_pick=index)
            html = self._sd.page_source # read page html after browser actions
            more_info_url = self._sd.current_url
            bs4_obj = convert_html_source_to_bs4_obj(html)
        else:
            raise ValueError(f"Unsupported navigate_by: {self._navigate_to_more_info_by}")

        detailed_info = self._resolve_detailed_info(bs4_obj)
        return detailed_info
    
    def _get_detailed_info_for_all_listings(self, listing_object_list, listing_url):
        """
        Get detailed information for all job listings on a page.
        
        Args:
            listing_object_list: List of BeautifulSoup objects for listings
            listing_url (str): URL of the current listing page
            
        Returns:
            list: List of dictionaries containing detailed job information
        """
        detailed_info_list = []
        for i, listing_object in enumerate(listing_object_list):
            if self._open_browser_before_fetching_additional_details:
                self._sd.get(listing_url)
                wait_for_page_to_load_completely(self._sd, fixed_wait=self._wait_time_for_page_load_major)  # wait for the page to load
            detailed_info = self._get_detailed_info_from_listing(listing_object, i)
            detailed_info_list.append(detailed_info)
            if i > 2 and self._test_mode:
                break

        return detailed_info_list

    def _get_job_listings_with_bs4(self, careers_url):
        """
        Get job listings using BeautifulSoup (fetch_mode = 0).
        
        Args:
            careers_url (str): URL to scrape listings from
            
        Returns:
            tuple: (job_listing_object_list, careers_url)
        """     
        bs4_obj = get_bs4_obj_for_url(careers_url)
        job_listing_object_list = resolve_target_object(bs4_obj, self._job_listing_scrape_settings)
        return (job_listing_object_list, careers_url)

    def _get_job_listings_with_selenium(self, careers_url):
        """
        Get job listings using Selenium (fetch_mode = 1).
        
        Args:
            careers_url (str): URL to scrape listings from
            
        Returns:
            tuple: (job_listing_object_list, current_url)
        """
        self._sd.get(careers_url) # open the url first in a browser
        wait_for_page_to_load_completely(self._sd, fixed_wait=self._wait_time_for_page_load_major)  # wait for the page to load
        pre_scraping_instructions = self._listing_scrape_settings.get("pre_scraping_instructions", [])
        simulate_browser_actions(self._sd, pre_scraping_instructions, self._wait_time_for_page_load_major) # perform pre-scraping actions in browser
        html = self._sd.page_source # read page html after browser actions
        current_url = self._sd.current_url
        bs4_obj = convert_html_source_to_bs4_obj(html)
        job_listing_object_list = resolve_target_object(bs4_obj, self._job_listing_scrape_settings)
        
        return (job_listing_object_list, current_url)
    
    def _get_basic_info_from_listing(self, listing_object):
        """
        Get basic info from listing (OBSOLETE method - not currently in use).
        
        Args:
            listing_object: BeautifulSoup object for the listing
            
        Returns:
            dict: Dictionary containing basic job information
        """
        job_description_object = self._listing_scrape_settings["job_description_object"]
        location_object = self._listing_scrape_settings["location_object"]

        job_description = resolve_target_object(listing_object, job_description_object)
        location = resolve_target_object(listing_object, location_object)

        basic_info = {
            "job_description": job_description.text.strip() if job_description else "No job description available",
            "location": location.text.strip() if location else "No location specified",
        }
        
        return basic_info

    def _get_next_page_url(self, current_url):
        """
        Get the URL for the next page of job listings.
        
        Args:
            current_url (str): Current page URL
            
        Returns:
            str: Next page URL or None if no next page
        """
        if self._nav_to_next_page_by == "PARSE_HREF":
            # get next page url by parsing href tags
            bs4_obj = get_bs4_obj_for_url(current_url)
            nav_to_next_page_element = resolve_target_object(bs4_obj, self._nav_to_next_page_settings)
            next_page_url = nav_to_next_page_element.get("href") if nav_to_next_page_element else None
        elif self._nav_to_next_page_by == "BROWSER_ACTION":
            # get next page url by doing browser actions
            self._sd.get(current_url)
            wait_for_page_to_load_completely(self._sd, fixed_wait=self._wait_time_for_page_load_major)  # wait for the page to load
            browser_actions = self._nav_to_next_page_settings.get("browser_actions", [])
            simulate_browser_actions(self._sd, browser_actions, self._wait_time_for_page_load_major)
            next_page_url = self._sd.current_url

        return next_page_url

    def _check_end_of_navigation_marker(self, page_source):
        """
        Check if end of navigation marker is reached.
        
        Args:
            page_source (str): HTML page source
            
        Returns:
            bool: True if end of navigation is reached
        """
        if not self._end_of_navigation_marker:
            # if no end of navigation marker is defined then confirm that end of navigation is reached incase current_url == next_page_url
            return True
        page_source_bs4 = convert_html_source_to_bs4_obj(page_source)
        eon_mode = self._end_of_navigation_marker["eon_mode"]
        try:
            eon_object = resolve_target_object(page_source_bs4, self._end_of_navigation_marker)
        except:
            eon_object = None
        """
        eon is short form for end of navigation
        eon_mode = 0:
            In this mode, if the defined navigation marker is found in page source, then it indicates end of navigation.
        eon_mode = 1:
            In this mode, if the defined navigation marker is not found in page source, then it indicates end of navigation.
        NOTE: currently only 2 modes are defined it can be extended to things like navigation marker being not clickable
        """
        if eon_mode == 0 and eon_object is None:
            return False
        if eon_mode == 0 and eon_object is not None:
            return True
        if eon_mode == 1 and eon_object is None:
            return True
        if eon_mode == 1 and eon_object is not None:
            return False
        
        return True

    def _navigate_to_end_of_navigation(self):
        """
        Navigate to the end of navigation (mode-1 only).
        
        Returns:
            tuple: (bs4_obj, listing_url)
        """
        assert self._nav_to_next_page_by == "BROWSER_ACTION", "nav_to_end_before_scraping is only supported for BROWSER_ACTION"
        browser_actions = self._nav_to_next_page_settings.get("browser_actions", [])
        run_operations_in_a_loop(self._sd, browser_actions, fixed_wait=self._wait_time_for_page_load_minor, test_mode=self._test_mode)
        html = self._sd.page_source # read page html after browser actions
        listing_url = self._sd.current_url
        bs4_obj = convert_html_source_to_bs4_obj(html)

        return (bs4_obj, listing_url)
    
    def _scrape_using_mode1(self):
        """
        Scrape using mode-1: navigate to the end of results before starting scraping process.
        """
        self._sd.get(self._careers_url)
        wait_for_page_to_load_completely(self._sd, fixed_wait=self._wait_time_for_page_load_major)  # wait for the page to load
        (bs4_obj, listing_url) = self._navigate_to_end_of_navigation()
        listing_object_list = resolve_target_object(bs4_obj, self._listing_scrape_settings["job_listing"])
        self._posting_info_list = self._get_detailed_info_for_all_listings(listing_object_list, listing_url)

    def _scrape_using_mode2(self):
        """
        Scrape using mode-2: read page, extract listings, navigate to next page, repeat.
        """
        count = 0
        while True:
            # listing phase
            count += 1
            print("%s : %s" % (count, self._careers_url))
            if self._fetch_mode == 0:
                # fetch_mode = 0 --> fetch using beautiful soup
                (listing_object_list, listing_url) = self._get_job_listings_with_bs4(self._careers_url)
            elif self._fetch_mode == 1:
                # fetch_mode = 1 --> fetch using selenium
                (listing_object_list, listing_url) = self._get_job_listings_with_selenium(self._careers_url)
            else:
                raise ValueError(f"Unsupported fetch_mode: {self._fetch_mode}")
            # fetching additional info for all job postings on the current page
            posting_info_list_current_page = self._get_detailed_info_for_all_listings(listing_object_list, listing_url)
            self._posting_info_list = self._posting_info_list + posting_info_list_current_page
            # get next page url
            next_page_url = self._get_next_page_url(listing_url)
            # check if end of navigation condition is reached. If reached break out
            if count > 2 and self._test_mode:
                break
            if next_page_url is None:
                # end of navigation reached
                print("exiting from None")
                break
            if listing_url == next_page_url:
                # this happens navigation is disabled and navigate to next page is not possible anymore
                # check if end of navigation marker is reached
                eon_reached = self._check_end_of_navigation_marker(self._sd.page_source)
                if eon_reached:
                    break
            # if end of navigation is not reached continue the same process with next_page_url
            self._careers_url = next_page_url

    def scrape(self):
        """
        Main scraping method that orchestrates the entire scraping process.
        
        Returns:
            list: List of dictionaries containing scraped job information
        """
        self._config = get_configuration(self._company)
        self._extract_details_from_config()
        self._sd = get_selenium_driver()
        self._posting_info_list = []
        if self._nav_to_end_before_scraping:
            self._scrape_using_mode1()
        else:
            self._scrape_using_mode2()
        self._sd.quit()  # Close the Selenium driver after scraping

        return self._posting_info_list

    def create_new_config(self):
        """Create a new empty configuration file for the company."""
        create_empty_config(self._company)