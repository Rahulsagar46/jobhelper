# Configuration File Fields Documentation

## root_url

- Type: string
- Description: The base URL for the careers or job listings page of the company.
- Mandatory field

## nav_to_end_before_scraping

- Type: boolean
- Description: If true, navigates to the end of the job listings before starting to scrape. Used to handle paginated or dynamically loaded listings.
- Optional field - defaults to false

## wait_until_load_major

- Type: int or None
- Description: Number of seconds to wait for major page loads (e.g., after navigation). used for Selenium waits.
- optional field
- defaults to None

## wait_until_load_minor

- Type: int or None
- Description: Number of seconds to wait for minor page loads (e.g., after clicking or small navigation steps).
- optional field
- defaults to null

## fragment_job_info_after_scraping

- Type: boolean or dict
- Description: If true or a dict, enables additional parsing
  of job info fragments after scraping, such as extracting specific text segments.
- optional field
- defaults to false

## listing

- Type: dict
- Description: Settings for scraping the main job listing page.
- Mandatory section

### root_tail

- Type: string
- Description: appended to root_url to form the full listing URL.
- Mandatory field
- can also be an empty string

### fetch_mode

- Type:int,
- Description: 0 for BeautifulSoup, 1 for Selenium.
- optional field
- defaults to 0

### pre_scraping_instructions

- Type: list of lists
- Description: Selenium actions to perform before scraping (e.g., clicking buttons, scrolling).
- each sublist contains: [action, tag, find by]
- optional field
- defaults to empty list

#### action

- Type: string
- Supported values: ButtonClick (only 1 currently)
- Mandatory field

#### tag

- Type: string
- Supported values: all html tags
- Mandatory field

#### find by

- Type: dict
- Description : all find options as supported by selenium's driver.find_elements() method
- Supported methods: By.ID, By.CSS_SELECTOR, By.TAG_NAME, By.XPATH, by.CLASS_NAME
- Mandatory field, can also be an empty dict

### job_listing

- Type: dict
- Description: configuration for locating job listing elements (see resolution_hierarchy below).
- Mandatory sub section

#### resolution_hierarchy

- Type: list of lists,
- each sublist contains: [tag, find_by, multiple_instances_expected, index_to_pick]
- This is used while filtering target objects from page sources using beautiful soup's find_all() method.
- while resolving the hierarchy, the input parent object is filtered based on the sublist in index-1. The result of this will be input for filtering using sublist in index-2 and so on until the last sublist in the resolution_hierarchy main list. The end result will be your target element / elements

##### tag (index 0)

- Type: string,
- Description: HTML tag to search for (e.g., "div", "a").
- Mandatory field

##### find_by (index 1)

- Type: dict,
- Description: attributes to match (e.g., {"class": "job-title"}).
- Mandatory field

##### multiple_instances_expected (index 2)

- Type: boolean
- Description: whether to expect multiple matches.
- Mandatory field

##### index_to_pick (index 3)

- Type: int or None
- Description: which element to pick if multiple are found.
- Optional field
- If not provided defaults to 0 in case of multiple matches

## more_info_object

- Type: dict
- Description: Configuration for extracting detailed job info from individual listings.

### navigate_by

- Type: string
- Allowed values: "PARSE_HREF" to follow a link, "BROWSER_ACTION" to perform browser actions.

### prepend_root_to_url

Type: boolean
Description: whether to prepend root_url to relative links.

### wait_until_load

Type: int or None
Description: seconds to wait after navigatinf to job details URL

### browser_actions

Type: list
Description: Selenium actions to perform to reach the detailed info (same as prescraping_instructions).

## nav_to_next_page

- Type: dict
- Description: Configuration for navigating to the next page of job listings.

### navigate_by

- Type: string
- Allowed values: "PARSE_HREF" or "BROWSER_ACTION".

### browser_actions

- Type: list
- Description: Selenium actions to perform for navigation (same as prescraping_instructions).

### end_of_navigation_marker

- Type: dict,
- Description: configuration to detect the end of pagination.Used to determine when the last page of listings has been reached

#### eon_mode

- Type: int
- Supported values: 0 and 1
- Description: logic for end detection (see code for details).

#### resolution_hierarchy

- Type: list of lists,
- Description: as described above, used to locate the marker element.

## details

- Type: dict
- Description: configuration for extracting specific fields from the detailed job page.

### total_text

- Type: string
- Description: Incases where each subsection cannot be individually scrapped, all the text is added to this key. At a later step this text is fragmented

### to_be_parsed

- Type: dict
- Description: For each section of information to be scrapped, the start flag and end flag in the total text are defined as a list. So, the text that is present between these two flags will be added to that key
- Example : "about_job" : ["General Summary:", "Core Responsibilities:"]
  In the above example the text that is present between start flag 'General Summary' and end flag 'Core Responsibilities' will be added as a value for the key 'about_job' in the 'details' dictionary
