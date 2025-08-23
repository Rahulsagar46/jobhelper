"""
Text parsing and manipulation utilities.
"""


def cut_target_fragment_from_total_text(total_text, start, end):
    """Extract text fragment between start and end markers."""
    chunks1 = total_text.split(start)
    chunk_below = chunks1[1].strip()
    
    chunks2 = chunk_below.split(end)
    chunk2_above = chunks2[0].strip()

    return chunk2_above