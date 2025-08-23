"""
BeautifulSoup-based HTML parsing operations.
"""
import requests
from bs4 import BeautifulSoup


def get_html_source_from_url(url):
    """Fetch HTML content from a URL."""
    response = requests.get(url)
    html_source = response.content
    
    return html_source


def convert_html_source_to_bs4_obj(html_content):
    """Convert HTML content to BeautifulSoup object."""
    bs4_obj = BeautifulSoup(html_content, 'html.parser')
    
    return bs4_obj


def get_bs4_obj_for_url(url):
    """Get BeautifulSoup object directly from URL."""
    html_content = get_html_source_from_url(url)
    bs4_obj = convert_html_source_to_bs4_obj(html_content)
    
    return bs4_obj


def resolve_target_object(parent_bs4_object, reference_config):
    """Resolve target object based on configuration hierarchy."""
    resolution_order = reference_config['resolution_hierarchy']
    multiple = False
    parent_obj = parent_bs4_object
    
    if len(resolution_order) == 0:
        return parent_obj
        
    for item in resolution_order:
        tag = item[0]
        find_by = item[1]
        multiple_instances_expected = item[2]        
        index_to_pick = item[3] if len(item) > 3 else None
        
        if multiple_instances_expected:
            elements = parent_obj.find_all(tag, attrs=find_by)
            if index_to_pick is not None:
                element = elements[index_to_pick]
                parent_obj = element
                multiple = False
            else:    
                multiple = True
        else:
            element = parent_obj.find(tag, attrs=find_by)
            multiple = False
            parent = element
            parent_obj = parent

    return elements if multiple else element