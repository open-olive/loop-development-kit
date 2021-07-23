// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactElement, ReactNode, ReactNodeArray, ReactPortal } from "react";
import * as JSXComponents from '../components';
import { Button, Component, Markdown, WhisperComponentType } from './types';

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

function convertElement(component: ReactElement): Component {
  if (component.type === JSXComponents.Markdown) {
    const initialValue: Markdown = {
      ...component.props,
      type: WhisperComponentType.Markdown,
      body: component.props.children,
    };
    delete (initialValue as any).children;
    if (component.key != null) {
      initialValue.key =
        typeof component.key === 'number' ? component.key.toString() : component.key;
    }
    return initialValue as Markdown;
  }
  if (component.type === JSXComponents.Button) {
    const output: Button = {
      ...component.props,
      type: WhisperComponentType.Button,
      label: component.props.children,
    };
    delete (output as any).children;
    if (component.key != null) {
      output.key = typeof component.key === 'number' ? component.key.toString() : component.key;
    }
    return output as Button;
  }
  throw new Error(`Unexpected type ${component.type.toString()}`);
}
