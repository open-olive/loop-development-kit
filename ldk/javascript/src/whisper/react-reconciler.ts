import * as Reconciler from 'react-reconciler';
import { OpaqueHandle } from 'react-reconciler';
import { ReactNode } from 'react';
import { Markdown, NewWhisper, UpdateWhisper, WhisperComponent, WhisperComponentType } from "./types";



export type Type = string;
export type Props = Record<string, any>;
export type Container = any;
export type Instance = WhisperComponent<any>;
export type TextInstance = Markdown;
export type HostConfigSuspenseInstance = string;
export type HostConfigHydratableInstance = string;
export type HostConfigPublicInstance = string;
export type HostContext = string;
export type Update = string;
export type ChildSet = any[];
export type HostConfigTimeoutHandle = NodeJS.Timeout;
export type HostConfigNoTimeout = string;

interface CoreConfig {
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

interface PersistenceConfig {
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

const config: CoreConfig & PersistenceConfig = {
  afterActiveInstanceBlur: undefined,
  akeOpaqueHydratingObject: undefined,
  appendChildToContainerChildSet(childSet: ChildSet, child: Instance | TextInstance): ChildSet {
    const returnValue =  [...childSet, child];
    console.log("appendChildToContainerChildSet", returnValue);
    return returnValue;
  },
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    throw new Error('Not Implemented');
  },
  beforeActiveInstanceBlur: undefined,
  cancelTimeout(id: HostConfigTimeoutHandle): void {
    throw new Error("Not Implemented");
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
    throw new Error('Not Implemented');
  },
  createContainerChildSet(container: Container): ChildSet {
    return [];
  },
  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: Reconciler.OpaqueHandle,
  ): Instance {
    return {
      type,
      ...props,
    };
    throw new Error('Not Implemented');
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
    }
  },
  detachDeletedInstance: undefined,
  finalizeContainerChildren(container: Container, newChildren: ChildSet): void {
    console.log("finalizeContainerChildren", container, newChildren);
  },
  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): boolean {
    // Should I do anything here?
    console.log("finalizedInitialChildren", instance, type, props, rootContainer, hostContext);
    return false;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container,
  ): HostContext {
    return 'context';
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
    console.log("prepareForCommit");
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
    throw new Error('Not Implemented');
  },
  replaceContainerChildren(container: Container, newChildren: ChildSet): void {
    console.log('replaceContainerChildren', container, newChildren);
    container.createOrUpdateWhisper(newChildren);
  },
  resetAfterCommit(containerInfo: Container): void {
    console.log("resetAfterCommit completed");
  },
  scheduleTimeout(
    fn: (...args: unknown[]) => unknown,
    delay: number | undefined,
  ): HostConfigTimeoutHandle {
    throw new Error("Not Implemeted");
    return setTimeout(fn, delay);
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    return type === 'button';
  },
  supportsHydration: false,
  supportsMutation: false,
  supportsPersistence: true,
  warnsIfNotActing: undefined,
};

const Renderer = Reconciler.default(config);

export interface WhisperInterface {
  createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): void;
}

export function render(element: ReactNode, whisperInterface: WhisperInterface, callback: (value?: unknown) => void): void {
  // TODO: Generate whisper interfaces.
  console.log("STARTING")
  const container = Renderer.createContainer(whisperInterface, 0, false, null)
  Renderer.updateContainer(element, container, null, callback);
}