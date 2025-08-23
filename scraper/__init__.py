"""
Job scraper package for extracting job listings from company career pages.
"""
from .core.scraper import JobScrapper
from .config.manager import get_configuration, create_empty_config, get_supported_companies

__version__ = "1.0.0"
__author__ = "Job Scraper Team"

__all__ = [
    "JobScrapper",
    "get_configuration", 
    "create_empty_config",
    "get_supported_companies"
]