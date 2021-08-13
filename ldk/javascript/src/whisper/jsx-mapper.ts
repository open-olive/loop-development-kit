// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactElement, ReactNode, ReactNodeArray, ReactPortal } from "react";
import * as JSXComponents from '../components';
import { Button, Component, Markdown, WhisperComponent, WhisperComponentType } from "./types";

export function jsxMapper(nodes: ReactNode, topLevel = false): Array<Component> {
  if (nodes === null || nodes === false || nodes === true || nodes === undefined) {
    return [];
  }
  if (typeof nodes === 'string' || typeof nodes === 'number') {
    return [buildMarkdown(nodes)];
  }
  if (Object.keys(nodes).length === 0 && nodes.constructor === Object) {
    return [];
  }
  if (isReactFragment(nodes)) {
    return nodes.props.children?.map(convertElement) ?? [];

  }
  if (isReactElement(nodes)) {
    return [convertElement(nodes)];
  }
  return [];
}

function buildMarkdown(body: string | number): Markdown {
  return {
    type: WhisperComponentType.Markdown,
    body: body.toString(),
  };
}

function isDiscardableValue(nodes: ReactNode): nodes is null | boolean | undefined {
  return nodes === null || nodes === false || nodes === true || nodes === undefined;
}

function isReactFragment(nodes: ReactNode): nodes is ReactPortal {
  if (isDiscardableValue(nodes)) {
    return false;
  }
  return (nodes as any).type === Symbol.for('react.fragment');
}

function isReactElement(nodes: ReactNode): nodes is ReactElement {
  if (isDiscardableValue(nodes)) {
    return false;
  }
  const objectKeys = Object.keys(nodes);
  return ['key', 'ref', 'type', 'props'].every((key) => objectKeys.includes(key));
}

function assignKey(
  component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  initialValue: WhisperComponent<any>,
): void {
  if (component.key != null) {
    // eslint-disable-next-line no-param-reassign -- intentional mutation
    initialValue.key = typeof component.key === 'number' ? component.key.toString() : component.key;
  }
}

function dropChildren(component: WhisperComponent<any>): void {
  // eslint-disable-next-line no-param-reassign -- intentional mutation
  delete (component as any).children;
}

function convertElement(component: ReactElement): Component {
  switch (component.type) {
    case JSXComponents.Markdown: {
      const initialValue: Markdown = {
        ...component.props,
        type: WhisperComponentType.Markdown,
        body: component.props.children,
      };
      dropChildren(initialValue);
      assignKey(component, initialValue);
      return initialValue as Markdown;
    }
    case JSXComponents.Button: {
      const output: Button = {
        ...component.props,
        type: WhisperComponentType.Button,
        label: component.props.children,
      };
      dropChildren(output);
      assignKey(component, output);
      return output as Button;
    }
    default:
      throw new Error(`Unexpected type ${component.type.toString()}`);
  }
}
