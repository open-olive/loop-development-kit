import { jsxMapper } from "./jsx-mapper";

describe('jsx mapper', () => {
  it('transforms an undefined value into an empty array', () => {
    expect(jsxMapper(false)).toEqual([]);
  });
});