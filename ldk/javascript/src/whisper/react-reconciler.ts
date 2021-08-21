/* eslint-disable no-param-reassign -- we're doing tons of mutations in this file intentionally */
import * as Reconciler from 'react-reconciler';
import { ReactNode } from 'react';
import { NewWhisper, UpdateWhisper, Whisper, WhisperComponentType } from './types';
import {
  ChildSet,
  Container,
  CoreConfig,
  HostConfigTimeoutHandle,
  HostContext,
  Instance,
  PersistenceConfig,
  Props,
  TextInstance,
  Type,
  Update,
} from './renderer-config';
import { handlerByHelpsType, handlerByTagType } from './component-handlers';
import { create } from './index';

const config: CoreConfig & PersistenceConfig = {
  afterActiveInstanceBlur: undefined,
  akeOpaqueHydratingObject: undefined,
  appendChildToContainerChildSet(childSet: ChildSet, child: Instance | TextInstance): ChildSet {
    // In this function we are adding the Whisper properties to the ChildSet.
    const whisper = (child as unknown) as NewWhisper;
    childSet.label = whisper.label;
    childSet.components = whisper.components;
    // console.log("appendChildToContainerChildSet", childSet, child);
    return childSet;
  },
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    // TODO: Do I want to check whether the parent accepts children here?
    handlerByHelpsType[parentInstance.type]?.appendInitialChild?.(parentInstance, child);
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
    const instance = {
      type: handlerByTagType[type].helpsType,
      ...propsWithoutChildren,
    };
    handlerByTagType[type]?.assignTextChildren?.(instance, props);
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
    // I don't think I need to do anything here;
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

const Renderer = Reconciler.default(config);

export interface WhisperInterface {
  createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): void;
}

// TODO: When a whisper is closed I need to unmount its contents. I probably need to
//  call updateContainer again with an empty element.
class WhisperRenderInstance implements WhisperInterface {
  private whisper: Whisper | undefined;

  async createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): Promise<void> {
    if (this.whisper == null) {
      this.whisper = await create(whisperData as NewWhisper);
    } else {
      await this.whisper.update(whisperData);
    }
  }
}

export function render(
  element: ReactNode,
  whisperInterface: WhisperInterface,
  callback: (value?: unknown) => void,
): void {
  // TODO: Tag here drives what sort of "modes" its using. 0 = LegacyRoot.
  const container = Renderer.createContainer(whisperInterface, 0, false, null);
  // TODO: Figure out how to handle multiple calls. Or even if I should.
  Renderer.updateContainer(element, container, null, callback);
}

export function renderNewWhisper(element: ReactNode): void {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(element, new WhisperRenderInstance(), () => {});
}