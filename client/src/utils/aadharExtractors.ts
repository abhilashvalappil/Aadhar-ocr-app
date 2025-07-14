export const extractName = (text: string): string => {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const govIndex = lines.findIndex(line => /government of india/i.test(line));

  if (govIndex !== -1) {
    // Search next few lines for English name
    for (let i = govIndex + 1; i <= govIndex + 3 && i < lines.length; i++) {
      const line = lines[i];
      if (/^[A-Za-z\s]+$/.test(line)) {
        return line.trim();
      }
    }
  }
  return '';
};


export const extractAadharNumber = (text: string): string => {
  const match = text.match(/\d{4}\s\d{4}\s\d{4}/);
  return match ? match[0] : '';
};

export const extractDOB = (text: string): string => {
  const match = text.match(/(?:Year of Birth|DOB)[^\d]*(\d{4})/i);
  return match ? match[1] : '';
};

export const extractGender = (text: string): string => {
  const match = text.match(/Male|Female|Transgender/i);
  return match ? match[0] : '';
};

export const extractAddress = (text: string): string => {
  const match = text.match(/Address[:\s]*([\s\S]*)/i);
  return match ? match[1].split('\n').slice(0, 3).join(', ').trim() : '';
};

export const extractPincode = (text: string): string => {
  const match = text.match(/\b\d{6}\b/);
  return match ? match[0] : '';
};
