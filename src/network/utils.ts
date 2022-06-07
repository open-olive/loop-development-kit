export const stripBom = (value: Uint8Array): Uint8Array => {
  if (value.length > 2 && value[0] === 0xef && value[1] === 0xbb && value[2] === 0xbf) {
    return value.slice(3);
  }
  return value;
};
