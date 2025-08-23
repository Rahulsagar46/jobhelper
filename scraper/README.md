# Job Scraper Module

A clean, production-ready web scraper for extracting job listings from company career pages.

## Structure

```
scraper/
├── __init__.py              # Main package exports
├── __main__.py              # Entry point for running the scraper
├── README.md               # This documentation
├── core/                   # Core scraper functionality
│   ├── __init__.py
│   ├── scraper.py          # Main JobScrapper class
│   ├── parsers/            # HTML and text parsing utilities
│   │   ├── __init__.py
│   │   ├── bs4_parser.py   # BeautifulSoup operations
│   │   └── text_parser.py  # Text manipulation utilities
│   ├── automation/         # Browser automation
│   │   ├── __init__.py
│   │   └── selenium_driver.py  # Selenium WebDriver operations
│   └── utils/             # Common utilities
│       ├── __init__.py
│       └── file_operations.py  # File I/O operations
└── config/                # Configuration management
    ├── __init__.py
    ├── manager.py         # Configuration manager
    └── companies/         # Company-specific config files
        ├── apple.config.json
        ├── google.config.json
        ├── qualcomm.config.json
        └── ...
```

## Usage

### Command Line (Primary Method)

```bash
# Run with hardcoded settings (edit __main__.py lines 70-71 to change)
python -m scraper

# With verbose logging
python -m scraper --verbose

# Create configuration template
python -m scraper --create-config
```

### Programmatic Usage

```python
from scraper import JobScrapper

# Create scraper instance
scraper = JobScrapper("qualcomm", test_mode=True)

# Start scraping
job_listings = scraper.scrape()

# Process results
for job in job_listings:
    print(f"Title: {job.get('job_title', 'N/A')}")
    print(f"Location: {job.get('location', 'N/A')}")
```

### Configuration

**To change company or test mode**, edit `__main__.py` lines 70-71:
```python
company = "qualcomm"    # Change to: google, apple, microsoft, etc.
test_mode = True        # Change to False for full scraping
```

### Supported Companies

```python
from scraper import get_supported_companies

companies = get_supported_companies()
print(companies)  # ['google', 'apple', 'qualcomm', 'microsoft', 'meta', 'synopsys', 'micron']
```

## Company Configuration

Each company has its own configuration file in `config/companies/` that defines:

- Root URL and navigation settings
- HTML element selectors for job listings
- Data extraction rules
- Browser automation instructions

## Features

- **Multi-mode scraping**: BeautifulSoup (fast) and Selenium (dynamic content)
- **Configurable extraction**: JSON-based configuration for each company
- **Cross-platform**: Works on Windows, Linux, and macOS
- **Production-ready**: Proper error handling, logging, and structure
- **Extensible**: Easy to add new companies and extraction rules

## Dependencies

- requests==2.32.3
- beautifulsoup4==4.12.3
- selenium==4.35.0

## Adding New Companies

1. Create a new config file in `config/companies/[company].config.json`
2. Add the company to the `_company_to_config_file_map` in `config/manager.py`
3. Test the configuration with the scraper