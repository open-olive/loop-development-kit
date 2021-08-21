/* eslint-disable no-param-reassign -- we're doing tons of mutations in this file intentionally */
import { Instance, Props, TextInstance } from './renderer-config';

const assignTextChildrenToProperty: (
  propertyNane: string,
) => (instance: Instance, newProps: Props) => void = (propertyName) => (instance, props) => {
  (instance as any)[propertyName] = props.children.toString();
};

function createAppendFunction(
  childPropertyName: string,
): (instance: Instance, child: Instance | TextInstance) => void {
  return (instance, child) => {
    if ((instance as any)[childPropertyName] == null) {
      (instance as any)[childPropertyName] = [];
    }
    (instance as any)[childPropertyName].push(child);
  };
}

interface ComponentSpecificHandler {
  appendInitialChild?(parentInstance: Instance, child: Instance | TextInstance): void;

  /**
   * Whether text children should be set or not. If set to true, I think React
   * skips appending children.
   */
  shouldSetTextChildren?(): boolean;

  /**
   * Attaches the text children to this instance.
   * @param instance
   * @param newProps
   */
  assignTextChildren?(instance: Instance, newProps: Props): void;

  /**
   * Provide the full complete component type string that Helps expects.
   */
  helpsType: string;

  whisperTagType: string;
}

const handlers: Array<ComponentSpecificHandler> = [
  {
    assignTextChildren: assignTextChildrenToProperty('body'),
    shouldSetTextChildren: () => true,
    helpsType: 'markdown',
    whisperTagType: 'oh-markdown',
  },
  {
    assignTextChildren: assignTextChildrenToProperty('label'),
    shouldSetTextChildren: () => true,
    helpsType: 'button',
    whisperTagType: 'oh-button',
  },
  {
    appendInitialChild: createAppendFunction('components'),
    helpsType: 'whisper',
    whisperTagType: 'oh-whisper',
  },
  {
    appendInitialChild: createAppendFunction('children'),
    helpsType: 'box',
    whisperTagType: 'oh-box',
  },
  {
    assignTextChildren: assignTextChildrenToProperty('label'),
    shouldSetTextChildren: () => true,
    helpsType: 'checkbox',
    whisperTagType: 'oh-checkbox',
  },
];

export const handlerByHelpsType = handlers.reduce<Record<string, ComponentSpecificHandler>>(
  (record, currentValue) => {
    record[currentValue.helpsType] = currentValue;
    return record;
  },
  {},
);
export const handlerByTagType = handlers.reduce<Record<string, ComponentSpecificHandler>>(
  (record, currentValue) => {
    record[currentValue.whisperTagType] = currentValue;
    return record;
  },
  {},
);
