import os
from corelib.file_io_operations.file_operations import read_json_file, write_json_file

# Get the directory where this config.py file is located
_config_dir = os.path.dirname(os.path.abspath(__file__))

# NOTE: when adding a new compyn to scrape, the company has to be added in this dict
# NOTE: once these are moved into database then a new company can be inserted using create_new_config() method of JobScrapper 
_company_to_config_file_map = {
    "google": os.path.join(_config_dir, "google.config.json"),
    "apple": os.path.join(_config_dir, "apple.config.json"),
    "qualcomm": os.path.join(_config_dir, "qualcomm.config.json"),
    "microsoft": os.path.join(_config_dir, "microsoft.config.json"),
    "meta": os.path.join(_config_dir, "meta.config.json"),
    "synopsys": os.path.join(_config_dir, "synopsys.config.json"),
    "micron": os.path.join(_config_dir, "micron.config.json")
}

def get_configuration(company):
    config_file = _company_to_config_file_map.get(company.lower(), None)
    if config_file is None:
        raise NotImplementedError(f"Configuration for {company} is not implemented.")    
    config_dict = read_json_file(config_file) 
    
    return config_dict

def create_empty_config(company):
    config_file = _company_to_config_file_map.get(company.lower(), None) 
    if config_file is None:
        raise NotImplementedError(f"Configuration for {company} is not implemented.")
    empty_config_dict = {
        "company": company,
        "root_url": "",
        "nav_to_end_before_scraping": False,
        "listing" : {
                    "root_tail" : "",
                    "fetch_mode" : 0,
                    "pre_scraping_instructions" : [],
                    "job_listing": {
                                    "resolution_hierarchy" :[]
                                    }
                    },
        "more_info_object": {
                    "navigate_by": None,
                    "prepend_root_to_url": None,
                    "resolution_hierarchy": []
                    },
        "nav_to_next_page": {
                    "navigate_by": None,
                    "prepend_root_to_url": None,
                    "resolution_hierarchy": []
                    },
        "details": {
                    "job_title": {
                        "resolution_hierarchy": []
                        },
                    "location": {
                        "resolution_hierarchy": []
                        },
                    "minimum_qualification": {
                        "resolution_hierarchy": []
                    },
                    "preferred_qualification": {
                        "resolution_hierarchy": []
                    },
                    "about_job": {
                        "resolution_hierarchy": []
                    },
                    "responsibilities": {
                        "resolution_hierarchy": []
                    }
                }        
            }
    
    write_json_file(config_file, empty_config_dict)

if __name__ == "__main__":
    create_empty_config("synopsys")

# end
