import json

def read_file(file_path):
    """
    Reads the content of a file and returns it as a string.

    Args:
        file_path (str): The path to the file.

    Returns:
        str: The content of the file.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()
    
def read_json_file(file_path):
    """
    Reads a JSON file and returns its content as a dictionary.

    Args:
        file_path (str): The path to the JSON file.

    Returns:
        dict: The content of the JSON file.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def write_json_file(file_path, json_dict):
    """
    Writes a dictionary to a JSON file.

    Args:
        file_path (str): The path to the JSON file.
        data (dict): The data to write to the JSON file.
    """
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(json_dict, f, ensure_ascii=False, indent=4)