export const shortText = (str: string, maxLength: number) => {
  const normDesc = str.indexOf(' ', maxLength);
  return normDesc === -1 ? str : str.substr(0, normDesc);
};
