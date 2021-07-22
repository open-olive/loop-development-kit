import * as babel from '@babel/core';
import { buildBabelPlugins, buildBabelPreset } from "./babel-config";

const expected = `"use strict";

var _jsxRuntime = require("@oliveai/ldk/dist/jsx-runtime");

(0, _jsxRuntime.jsx)(Markdown, {
  children: "bob"
});`

describe('Babel JSX configuration', () => {
  it('converts JSX as expected', () => {
    const code = '<Markdown>bob</Markdown>';
    const result = babel.transform(code, {presets: buildBabelPreset(), plugins: buildBabelPlugins(true)});

    expect(result!.code).toEqual(expected);

  })
});