#!/usr/bin/env python3
"""
Job Scraper - Production-ready web scraper for job listings.

This module provides a command-line interface for scraping job listings from
various company career pages using configurable selectors and automation.
"""
import argparse
import logging
import sys
import time
from typing import List, Dict, Any

# Add parent directory to path for imports
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scraper.core.scraper import JobScrapper
from scraper.config.manager import get_supported_companies


def setup_logging(verbose: bool = False) -> None:
    """Setup logging configuration."""
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )


def parse_arguments() -> argparse.Namespace:
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description='Scrape job listings from company career pages',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=f"""
Supported companies:
{', '.join(get_supported_companies())}

Examples:
  %(prog)s --verbose            # Verbose logging
  %(prog)s --create-config      # Create new config template
        """.strip()
    )
    
    parser.add_argument(
        '--create-config',
        action='store_true',
        help='Create a new configuration template for the company'
    )
    
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Enable verbose logging'
    )
    
    return parser.parse_args()


def main() -> int:
    """Main function to run the job scraper."""
    try:
        args = parse_arguments()
        setup_logging(args.verbose)
        logger = logging.getLogger(__name__)
        
        # Hardcoded settings - change these for each run
        company = "apple"
        test_mode = True
        
        logger.info(f"Starting job scraper for {company}")
        logger.info(f"Test mode: {test_mode}")
        
        start_time = time.time()
        
        # Initialize scraper
        scraper = JobScrapper(company, test_mode=test_mode)
        
        # Create config if requested
        if args.create_config:
            logger.info(f"Creating new configuration template for {company}")
            scraper.create_new_config()
            logger.info("Configuration template created successfully")
            return 0
        
        # Start scraping
        logger.info("Starting scraping process...")
        job_listings = scraper.scrape()
        
        end_time = time.time()
        duration = end_time - start_time
        
        logger.info(f"Scraping completed in {duration:.2f} seconds")
        logger.info(f"Total job listings found: {len(job_listings)}")
        
        # Output results
        if test_mode and job_listings:
            print("\n" + "="*50)
            print("SCRAPED JOB LISTINGS")
            print("="*50)
            for i, posting in enumerate(job_listings, 1):
                print(f"\n--- Job {i} ---")
                for key, value in posting.items():
                    print(f"{key}: {value}")
        elif not test_mode:
            logger.info("Scraping completed. Test mode disabled - no sample results shown.")
        
        return 0
        
    except KeyboardInterrupt:
        logger.info("Scraping interrupted by user")
        return 1
    except Exception as e:
        logger.error(f"Scraping failed: {str(e)}")
        if args.verbose:
            logger.exception("Full traceback:")
        return 1


if __name__ == "__main__":
    sys.exit(main())