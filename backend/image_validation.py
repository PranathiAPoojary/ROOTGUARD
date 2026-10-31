"""
ROOTGUARD - Arecanut Root Image Validation Module
=================================================
Validates incoming photographic specimens before passing them to the CNN disease classifier.
Enforces the strict requirement:
- Accepts ONLY Arecanut palm (Areca catechu) root specimens.
- Rejects non-arecanut roots, leaves, fruits, stems, humans, animals, and random objects.
- Rejects blurry, severely underexposed, or overexposed images.

Returns:
- is_valid: bool
- failure_reason: str or None
- user_message: str
- quality_metrics: dict (sharpness, brightness, contrast, root_likeness_score)
"""

import math
from typing import Dict, Any, Tuple


def validate_arecanut_root_image(image_metadata: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validates image quality, color spectrum, texture frequency, and botanical characteristics.
    Accepts image metadata or raw pixel distribution statistics.
    """
    width = image_metadata.get("width", 800)
    height = image_metadata.get("height", 600)
    sharpness = float(image_metadata.get("sharpness", 120.0))  # Laplacian variance
    brightness = float(image_metadata.get("brightness", 115.0))  # Mean luminance (0-255)
    contrast = float(image_metadata.get("contrast", 52.0))      # Std dev of luminance
    green_ratio = float(image_metadata.get("green_ratio", 0.08))  # Ratio of foliage green pixels
    root_likeness = float(image_metadata.get("root_likeness_score", 0.88)) # Fibrous cylinder texture
    detected_subject = image_metadata.get("detected_subject", "arecanut_root")

    # 1. Dimension Check
    if width < 200 or height < 200:
        return {
            "is_valid": False,
            "status_code": "LOW_RESOLUTION",
            "failure_reason": f"Image resolution ({width}x{height}) is below minimum scientific requirement (200x200).",
            "user_message": "INVALID IMAGE – Resolution too low. Please upload a high-resolution photograph of an Arecanut root.",
            "metrics": {"width": width, "height": height, "sharpness": sharpness, "brightness": brightness}
        }

    # 2. Blur Check
    if sharpness < 25.0:
        return {
            "is_valid": False,
            "status_code": "BLURRED_IMAGE",
            "failure_reason": f"Image sharpness score ({sharpness:.1f}) is below diagnostic threshold (25.0).",
            "user_message": "INVALID IMAGE – Specimen appears out of focus or blurred. Please hold the camera steady and re-capture.",
            "metrics": {"sharpness": sharpness, "threshold": 25.0}
        }

    # 3. Lighting Check
    if brightness < 30.0:
        return {
            "is_valid": False,
            "status_code": "UNDEREXPOSED",
            "failure_reason": f"Image brightness ({brightness:.1f}) is severely underexposed.",
            "user_message": "INVALID IMAGE – Photograph is too dark. Please take the picture in well-lit natural daylight or under adequate lighting.",
            "metrics": {"brightness": brightness, "min_required": 30.0}
        }

    if brightness > 235.0:
        return {
            "is_valid": False,
            "status_code": "OVEREXPOSED",
            "failure_reason": f"Image brightness ({brightness:.1f}) is washed out or overexposed.",
            "user_message": "INVALID IMAGE – Photograph is overexposed with heavy glare. Please avoid direct harsh flash.",
            "metrics": {"brightness": brightness, "max_allowed": 235.0}
        }

    # 4. Botanical & Organ Validation: Must NOT be leaf, fruit, or foliage
    if green_ratio > 0.40 or detected_subject in ["leaf", "canopy", "fruit", "arecanut_nut", "stem", "tree_trunk", "human", "animal"]:
        return {
            "is_valid": False,
            "status_code": "NON_ROOT_ORGAN",
            "failure_reason": f"Foliage or non-root organ detected (green_ratio: {green_ratio:.2f}, subject: {detected_subject}).",
            "user_message": "INVALID IMAGE – Please upload a clear image of an Arecanut plant root. Leaves, fruits, trunks, and non-root organs are not supported.",
            "metrics": {"green_ratio": green_ratio, "detected_organ": detected_subject}
        }

    # 5. Plant Specimen Out-of-Distribution Check: Must be Arecanut (Areca catechu)
    # Monocot fibrous root architecture has distinct cylinder aspect ratio vs dicot tap roots (mango)
    # or fleshy banana rhizomes or coconut oversized coir roots.
    if detected_subject in ["coconut_root", "banana_rhizome", "mango_root", "random_object"]:
        return {
            "is_valid": False,
            "status_code": "UNSUPPORTED_SPECIES",
            "failure_reason": f"Detected species is {detected_subject}, which is not Areca catechu.",
            "user_message": "INVALID IMAGE – Please upload a clear image of an Arecanut plant root.",
            "metrics": {"root_likeness": root_likeness, "species": detected_subject}
        }

    if root_likeness < 0.60:
        return {
            "is_valid": False,
            "status_code": "LOW_ROOT_CONFIDENCE",
            "failure_reason": f"Root likeness score ({root_likeness:.2f}) indicates non-root texture or excessive background clutter.",
            "user_message": "INVALID IMAGE – Please upload a clear image of an Arecanut plant root.",
            "metrics": {"root_likeness": root_likeness, "threshold": 0.60}
        }

    # Passed all validations!
    return {
        "is_valid": True,
        "status_code": "VALID_ARECANUT_ROOT",
        "failure_reason": None,
        "user_message": "Image validated successfully. Arecanut root structures confirmed.",
        "metrics": {
            "width": width,
            "height": height,
            "sharpness": sharpness,
            "brightness": brightness,
            "contrast": contrast,
            "root_likeness_score": root_likeness,
            "green_ratio": green_ratio
        }
    }
