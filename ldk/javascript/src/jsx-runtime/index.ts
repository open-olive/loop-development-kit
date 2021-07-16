export interface JSX {
  jsx(process: any, props: any, children: any): void  // eslint-disable-line
}

export function jsx(process: any, props: any, children: any): any { // eslint-disable-line
  if (typeof process === "function") {
    return process(props, children);
  }

  return console.log("unsupported tag name for jsx transform. A function is required");
}

export function fragment(): void { // eslint-disable-line
  console.log("fragments are unsupported");
}

export { jsx as jsxs, fragment as Fragment };
