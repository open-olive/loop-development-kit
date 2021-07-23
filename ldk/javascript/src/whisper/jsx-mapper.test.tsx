import { jsxMapper } from './jsx-mapper';
import * as Components from '../components';
import * as Types from './types';

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
      const expected: Types.Markdown = {
        type: Types.WhisperComponentType.Markdown,
        body: 'abc',
      };
      expect(jsxMapper(node)).toEqual([expected]);
    });
    it('transforms a number into a markdown component', () => {
      const node = 123;
      const expected: Types.Markdown = {
        type: Types.WhisperComponentType.Markdown,
        body: '123',
      };
      expect(jsxMapper(node)).toEqual([expected]);
    });
    it('transforms a Markdown component into a correctly formatted array', () => {
      const node = <Components.Markdown tooltip="bob">123</Components.Markdown>;
      const expected: Types.Markdown = {
        type: Types.WhisperComponentType.Markdown,
        body: '123',
        tooltip: 'bob',
      };
      expect(jsxMapper(node)).toEqual([expected]);
    });
  });
  describe('fragments', () => {
    it('transforms an empty fragment into an empty array', () => {
      const node = <></>;
      expect(jsxMapper(node)).toEqual([]);
    });
    it('transforms a fragment with an explicit markdown component and a button component correctly', () => {
      const buttonClick = jest.fn();
      const node = (
        <>
          <Components.Markdown>123</Components.Markdown>
          <Components.Button onClick={buttonClick}>button.label</Components.Button>
        </>
      );
      const expectedMarkdown: Types.Markdown = {
        type: Types.WhisperComponentType.Markdown,
        body: '123',
      };
      const expectedButton: Types.Button = {
        type: Types.WhisperComponentType.Button,
        label: 'button.label',
        onClick: buttonClick,
      };
      expect(jsxMapper(node, true)).toEqual([expectedMarkdown, expectedButton]);
    });
  });
});
