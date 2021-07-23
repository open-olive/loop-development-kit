import { jsxMapper } from './jsx-mapper';
import * as Components from '../components';
import { Markdown, WhisperComponentType } from './types';

describe('jsx mapper', () => {
  describe('falsy values', () => {
    it('transforms a false value into an empty array', () => {
      expect(jsxMapper(false)).toEqual([]);
    });
    it('transforms a null value into an empty array', () => {
      expect(jsxMapper(null)).toEqual([]);
    });
    it('transforms an undefined value into an empty array', () => {
      expect(jsxMapper(undefined)).toEqual([]);
    });
  });
  describe('single component', () => {
    it('transforms a string into a markdown component', () => {
      const node = 'abc';
      const expected: Markdown = {
        type: WhisperComponentType.Markdown,
        body: 'abc',
      };
      expect(jsxMapper(node)).toEqual([expected]);
    });
    it('transforms a number into a markdown component', () => {
      const node = 123;
      const expected: Markdown = {
        type: WhisperComponentType.Markdown,
        body: '123',
      };
      expect(jsxMapper(node)).toEqual([expected]);
    });
    it('transforms a Markdown component into an empty array', () => {
      const node = <Components.Markdown>123</Components.Markdown>;
      const expected: Markdown = {
        type: WhisperComponentType.Markdown,
        body: '123',
      };
      expect(jsxMapper(node)).toEqual([expected]);
    });
  });
  describe('fragments', () => {
    it('transforms an empty fragment into an empty array', () => {
      const node = <></>;
      expect(jsxMapper(node)).toEqual([]);
    });
  });
});
