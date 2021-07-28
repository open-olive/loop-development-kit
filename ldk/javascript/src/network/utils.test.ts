import { stripBom } from './utils';

describe('Utils', () => {
  describe('stripBom', () => {
    it('strips Bom before decoding', () => {
      const bomCharacter = new Uint8Array([239, 187, 191]);
      const encodedValue = new Uint8Array([225, 85]);
      const mergedArray = new Uint8Array(bomCharacter.length + encodedValue.length);
      mergedArray.set(bomCharacter);
      mergedArray.set(encodedValue, bomCharacter.length);

      const actual = stripBom(mergedArray);

      return expect(actual.toString()).toBe(encodedValue.toString());
    });
  });
});
