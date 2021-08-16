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
export type ChildSet = NewWhisper;
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      markdown: React.DetailedHTMLProps<any, any>;
      whisper: React.DetailedHTMLProps<any, any>;
    }
  }
}

const config: CoreConfig & PersistenceConfig = {
  afterActiveInstanceBlur: undefined,
  akeOpaqueHydratingObject: undefined,
  // Here we are
  appendChildToContainerChildSet(childSet: ChildSet, child: Instance | TextInstance): ChildSet {
    const whisper = child as unknown as NewWhisper;
    childSet.label = whisper.label;
    childSet.components = whisper.components;
    // console.log("appendChildToContainerChildSet", childSet, child);
    return childSet;
  },
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    // TODO: Do I want to check whether the parent accepts children here?
    if ((parentInstance as any).components == null) {
      (parentInstance as any).components = [];
    }
    (parentInstance as any).components.push(child);
  },
  beforeActiveInstanceBlur: undefined,
  cancelTimeout(id: HostConfigTimeoutHandle): void {
    console.log("cancelTimeout", id);
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
    return {
      label: '',
      components: [],
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
    const propsWithoutChildren = {...props};
    delete propsWithoutChildren.children;
    const instance = {
      type,
      ...propsWithoutChildren,
    };
    // TODO: Add support for properly creating other components here.
    if(type === 'button') {
      (instance as any).label = props.children.toString();
    } else if (type === 'markdown') {
      (instance as any).body = props.children.toString();
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
    }
  },
  detachDeletedInstance: undefined,
  finalizeContainerChildren(container: Container, newChildren: ChildSet): void {
    // console.log("finalizeContainerChildren", container, newChildren);
  },
  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): boolean {
    // I don't think I need to do anything here;
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
    console.log("scheduling timeout");
    return setTimeout(fn, delay);
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    return type === 'button' || type === 'markdown';
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
  const container = Renderer.createContainer(whisperInterface, 0, false, null)
  Renderer.updateContainer(element, container, null, callback);
}