/* eslint-disable no-param-reassign -- we're doing tons of mutations in this file intentionally */

import * as Reconciler from 'react-reconciler';
import { OpaqueHandle } from 'react-reconciler';
import { Markdown, NewWhisper, WhisperComponent, WhisperComponentType } from '../types';
import { handlerByHelpsType, handlerByTagType } from './component-handlers';

export type Type = string;
export type Props = Record<string, any>;
export type Container = any;
export type Instance = WhisperComponent<WhisperComponentType>;
export type TextInstance = Markdown;
export type HostConfigPublicInstance = string;
export type HostContext = null;
export type Update = Record<string, any>;
export type ChildSet = NewWhisper;
export type HostConfigTimeoutHandle = NodeJS.Timeout;
export type HostConfigNoTimeout = string;

export interface CoreConfig {
  getPublicInstance(instance: Instance | TextInstance): Instance;

  getRootHostContext(rootContainer: Container): HostContext | null;

  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container,
  ): HostContext;

  prepareForCommit(containerInfo: Container): Record<string, any> | null;

  resetAfterCommit(containerInfo: Container): void;

  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle,
  ): Instance;

  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void;

  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): boolean;

  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): Update | null;

  shouldSetTextContent(type: Type, props: Props): boolean;

  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle,
  ): TextInstance;

  scheduleTimeout(fn: (...args: unknown[]) => unknown, delay?: number): HostConfigTimeoutHandle;

  cancelTimeout(id: HostConfigTimeoutHandle): void;

  noTimeout: any;

  now(): number;

  isPrimaryRenderer: boolean;
  warnsIfNotActing: any;
  supportsMutation: boolean;
  supportsPersistence: boolean;
  supportsHydration: boolean;

  getInstanceFromNode(node: any): any;

  isOpaqueHydratingObject(value: any): boolean;

  makeOpaqueHydratingObject: any;
  akeOpaqueHydratingObject: any;
  makeClientId: any;
  makeClientIdInDEV: any;
  beforeActiveInstanceBlur: any;
  afterActiveInstanceBlur: any;
  preparePortalMount: any;
  prepareScopeUpdate: any;
  getInstanceFromScope: any;
  getCurrentEventPriority: any;
  detachDeletedInstance: any;
}

export interface PersistenceConfig {
  cloneInstance(
    instance: Instance,
    updatePayload: Update | null,
    type: Type,
    oldProps: Props,
    newProps: Props,
    internalInstanceHandle: any,
    keepChildren: boolean,
    recyclableInstance: null | Instance,
  ): Instance;

  createContainerChildSet(container: Container): ChildSet;

  appendChildToContainerChildSet(childSet: ChildSet, child: Instance | TextInstance): ChildSet;

  finalizeContainerChildren(container: Container, newChildren: ChildSet): void;

  replaceContainerChildren(container: Container, newChildren: ChildSet): void;

  getOffscreenContainerType(): string;

  getOffscreenContainerProps(mode: any, children: any): Props;

  cloneHiddenInstance(
    instance: Instance,
    type: Type,
    props: Props,
    internalInstanceHandle: any,
  ): Instance;

  cloneHiddenTextInstance(
    instance: Instance,
    text: string,
    internalInstanceHandle: any,
  ): TextInstance;
}

export const config: CoreConfig & PersistenceConfig = {
  afterActiveInstanceBlur: undefined,
  akeOpaqueHydratingObject: undefined,
  appendChildToContainerChildSet(childSet: ChildSet, child: Instance | TextInstance): ChildSet {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- just need to check type that doesn't exist in Instance
    if ((child as any).type !== 'whisper') {
      throw new Error('oh-whisper must be top-level element');
    }
    // In this function we are adding the Whisper properties to the ChildSet.
    const whisper = (child as unknown) as NewWhisper;
    childSet.label = whisper.label;
    childSet.components = whisper.components;
    return childSet;
  },
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    const result = handlerByHelpsType[parentInstance.type]?.appendInitialChild?.(parentInstance, child) || false;
    if (!result) {
      console.warn(`Cannot add item of type ${child.type} to parent of type ${parentInstance.type}`);
    }
  },
  beforeActiveInstanceBlur: undefined,
  cancelTimeout(id: HostConfigTimeoutHandle): void {
    clearTimeout(id);
  },
  cloneHiddenInstance(
    instance: Instance,
    type: Type,
    props: Props,
    internalInstanceHandle: any,
  ): Instance {
    throw new Error('Not Implemented');
  },
  cloneHiddenTextInstance(
    instance: Instance,
    text: string,
    internalInstanceHandle: any,
  ): TextInstance {
    throw new Error('Not Implemented');
  },
  cloneInstance(
    instance: Instance,
    updatePayload: Update | null,
    type: Type,
    oldProps: Props,
    newProps: Props,
    internalInstanceHandle: any,
    keepChildren: boolean,
    recyclableInstance: Instance | null,
  ): Instance {
    const value: any = {
      ...instance,
      ...newProps,
    };
    delete value.children;
    if (!keepChildren && value.components) {
      value.components = [];
    }
    handlerByTagType[type]?.assignTextChildren?.(instance, newProps);
    return value;
  },
  createContainerChildSet(container: Container): ChildSet {
    return {
      label: '',
      components: [],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose: () => {},
    };
  },
  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: Reconciler.OpaqueHandle,
  ): Instance {
    const propsWithoutChildren = { ...props };
    delete propsWithoutChildren.children;
    const instance: Instance = {
      type: handlerByTagType[type].helpsType,
      ...propsWithoutChildren,
    };
    handlerByTagType[type]?.assignTextChildren?.(instance, props);
    if (internalHandle.key) {
      instance.key = internalHandle.key;
    }
    return instance;
  },
  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: Reconciler.OpaqueHandle,
  ): TextInstance {
    return {
      type: WhisperComponentType.Markdown,
      body: text,
    };
  },
  detachDeletedInstance: undefined,
  finalizeContainerChildren(container: Container, newChildren: ChildSet): void {
    // No finalization needs to take place, these objects are ready as-is when generated.
  },
  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): boolean {
    // No finalization needs to take place here either;
    return false;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container,
  ): HostContext {
    return null;
  },
  getCurrentEventPriority: undefined,
  getInstanceFromNode(node: any): any {
    throw new Error('Not Implemented');
  },
  getInstanceFromScope: undefined,
  getOffscreenContainerProps(mode: any, children: any): Props {
    throw new Error('Not Implemented');
  },
  getOffscreenContainerType(): string {
    return '';
  },
  getPublicInstance(instance: Instance | TextInstance): Instance {
    return instance;
  },
  getRootHostContext(rootContainer: Container): HostContext | null {
    return null;
  },
  isOpaqueHydratingObject(value: any): boolean {
    return false;
  },
  isPrimaryRenderer: true,
  makeClientId: undefined,
  makeClientIdInDEV: undefined,
  makeOpaqueHydratingObject: undefined,
  noTimeout: undefined,
  now(): number {
    return 0;
  },
  prepareForCommit(containerInfo: Container): Record<string, any> | null {
    // DOM Renderer stores current text selection. I don't think I need to do anything like this.
    return null;
  },
  preparePortalMount: undefined,
  prepareScopeUpdate: undefined,
  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): Update | null {
    return newProps;
  },
  replaceContainerChildren(container: Container, newChildren: ChildSet): void {
    // Here we are creating or updating a whisper.
    container.createOrUpdateWhisper(newChildren);
  },
  resetAfterCommit(containerInfo: Container): void {
    // I don't need to do anything here because I never need to worry about transitional states.
  },
  scheduleTimeout(
    fn: (...args: unknown[]) => unknown,
    delay: number | undefined,
  ): HostConfigTimeoutHandle {
    return setTimeout(fn, delay);
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    return handlerByTagType[type]?.shouldSetTextChildren?.() || false;
  },
  supportsHydration: false,
  supportsMutation: false,
  supportsPersistence: true,
  warnsIfNotActing: undefined,
};
