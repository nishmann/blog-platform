export const shortText = (str: string, maxLength: number) => {
  if (str?.length <= maxLength) {
    return str;
  }
  return str?.slice(0, maxLength);
};
