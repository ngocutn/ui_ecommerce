export const ConvertStringType = (text) => {
  const formatted = text.charAt(0) + text.slice(1).toLowerCase();

  return formatted;
};

export default ConvertStringType;
