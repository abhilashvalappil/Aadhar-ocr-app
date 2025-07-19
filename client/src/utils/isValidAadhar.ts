const isValidAadharText = (text: string): boolean => {
  const aadhaarPattern = /\b\d{4} \d{4} \d{4}\b/;
  const lowerText = text.toLowerCase();

  return (
    aadhaarPattern.test(text) ||
    lowerText.includes("aadhaar") ||
    lowerText.includes("uidai") ||
    lowerText.includes("government of india")
  );
};

export default isValidAadharText;