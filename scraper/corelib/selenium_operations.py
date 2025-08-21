import time
from selenium import webdriver

from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import ElementClickInterceptedException, ElementNotInteractableException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_selenium_driver():
    chrome_options = Options()
    #chrome_options.add_argument("--headless")  # Run headless Chrome
    driver = webdriver.Chrome(options=chrome_options)

    return driver

def get_target_element(driver, instruction):
    find_by = instruction[2]
    key = list(find_by.keys())[0]
    val = find_by[key]
    try:
        if key == "id":
            target_tags = driver.find_elements(By.ID, val)
        elif key in ["aria-label", "role"]:
            target_tags = driver.find_elements(By.CSS_SELECTOR, f'[aria-label="{val}"]')
        elif key == "tag":
            target_tags = driver.find_elements(By.TAG_NAME, val)
        elif key == "text":
            target_tags = driver.find_elements(By.XPATH, f'//button[{key}()="{val}"]')
        elif key == "class":
            target_tags = driver.find_elements(By.CLASS_NAME, val)
        elif key == "XPATH":
            target_tags = driver.find_elements(By.XPATH, val)
        else:
            raise ValueError(f"Unsupported find_by key: {key}")
        #print(target_tags)
        if len(target_tags) == 0:
            raise NoSuchElementException(f"No elements found with {key}='{val}'")
        return target_tags
    except NoSuchElementException:
        print(f"Element with {key}='{val}' not found.")
        return None
    except:
        raise

def perform_action_on_element(driver, action, element, fixed_wait):
    driver.execute_script("arguments[0].scrollIntoView(true);", element)
    wait_for_element_to_be_visible(driver, element, fixed_wait=fixed_wait)
    try:
        if action == "ButtonClick":
            # Assuming the action is to click a button
            element.click()
            wait_for_page_to_load_completely(driver, fixed_wait=fixed_wait)
    except ElementClickInterceptedException:
        #print("came here element interception error")
        driver.execute_script("arguments[0].click();", element)
        wait_for_page_to_load_completely(driver, fixed_wait=fixed_wait)
    except ElementNotInteractableException:
        #print("came here element interception error")
        driver.execute_script("arguments[0].click();", element)
        wait_for_page_to_load_completely(driver, fixed_wait=fixed_wait)

def simulate_browser_actions(driver, instructions, fixed_wait, index_to_pick=0, test_mode=False):
    target_element = None
    for instruction in instructions:
        action = instruction[0]
        target_elements = get_target_element(driver, instruction)
        if not target_elements:
            continue
        if len(target_elements) == 1:
            target_element = target_elements[0]
        else:
            assert index_to_pick < len(target_elements), f"Index {index_to_pick} is out of bounds for target_tags"
            target_element = target_elements[index_to_pick]

        if not target_element:
            continue
        perform_action_on_element(driver, action, target_element, fixed_wait)

def run_operations_in_a_loop(driver, instructions, fixed_wait, index_to_pick=0, test_mode=False):
    eol_arrived = False
    while True:
        for instruction in instructions:
            action = instruction[0]
            target_elements = get_target_element(driver, instruction)
            if not target_elements:
                eol_arrived = True
                break
            if len(target_elements) == 1:
                target_element = target_elements[0]
            else:
                assert index_to_pick < len(target_elements), f"Index {index_to_pick} is out of bounds for target_tags"
                target_element = target_elements[index_to_pick]

            if not target_element:
                continue
            perform_action_on_element(driver, action, target_element, fixed_wait)
        if eol_arrived or test_mode:
            break

def wait_for_page_to_load_completely(driver, fixed_wait=None):
    """
    NOTE: This approach won't work for all cases, especially with dynamic content.
    try:
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )
    except TimeoutException:
        print(f"Page did not load completely within 10 seconds.")
        driver.execute_script("window.stop();")
    """  
    if fixed_wait is None:
        time.sleep(5)  # Default wait time if fixed_wait is not provided
    else:
        time.sleep(fixed_wait)

def wait_for_element_to_be_visible(driver, element, fixed_wait=None):
    if fixed_wait is not None:
        time.sleep(fixed_wait)
        return
    try:
        WebDriverWait(driver, 10).until(
            EC.visibility_of(element)
        )
    except TimeoutException:
        print(f"Element {element} was not visible within 10 seconds.")
        driver.execute_script("window.stop();")

def wait_for_element_to_be_clickable(driver, element, fixed_wait=None):
    if fixed_wait is not None:
        time.sleep(fixed_wait)
        return
    try:
        WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable(element)
        )
    except TimeoutException:
        print(f"Element {element} was not clickable within 10 seconds.")
        driver.execute_script("window.stop();")

# end
