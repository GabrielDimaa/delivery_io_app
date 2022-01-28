function extractNumber(value) {
    return value.replaceAll(".", "").replaceAll(",", ".");
}

export {extractNumber}