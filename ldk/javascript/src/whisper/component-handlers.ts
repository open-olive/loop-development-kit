/* eslint-disable no-param-reassign -- we're doing tons of mutations in this file intentionally */
import { Instance, Props, TextInstance } from './renderer-config';
import { WhisperComponentType } from './types';

const assignTextChildrenToProperty: (
  propertyNane: string,
) => (instance: Instance, newProps: Props) => void = (propertyName) => (instance, props) => {
  (instance as any)[propertyName] = props.children.toString();
};

function createAppendFunction(
  childPropertyName: string,
  excludeChildrenTypes: WhisperComponentType[] = [],
): (instance: Instance, child: Instance | TextInstance) => void {
  return (instance, child) => {
    if ((instance as any)[childPropertyName] == null) {
      (instance as any)[childPropertyName] = [];
    }
    if (excludeChildrenTypes.includes(child.type)) {
      // TODO: Warn here.
      return;
    }
    (instance as any)[childPropertyName].push(child);
  };
}

interface ComponentSpecificHandler {
  appendInitialChild?: (parentInstance: Instance, child: Instance | TextInstance) => void;

  /**
   * Whether text children should be set or not. If set to true, I think React
   * skips appending children.
   */
  shouldSetTextChildren?: () => boolean;

  /**
   * Attaches the text children to this instance.
   * @param instance
   * @param newProps
   */
  assignTextChildren?: (instance: Instance, newProps: Props) => void;

  /**
   * Provide the full complete component type string that Helps expects.
   */
  helpsType: WhisperComponentType;

  whisperTagType: keyof JSX.IntrinsicElements;
}

const handlers: Array<ComponentSpecificHandler> = [
  {
    appendInitialChild: createAppendFunction('children', [WhisperComponentType.CollapseBox]),
    helpsType: WhisperComponentType.Box,
    whisperTagType: 'oh-box',
  },
  {
    appendInitialChild: createAppendFunction('children'),
    helpsType: WhisperComponentType.CollapseBox,
    whisperTagType: 'oh-collapsebox',
  },
  {
    assignTextChildren: assignTextChildrenToProperty('label'),
    shouldSetTextChildren: () => true,
    helpsType: WhisperComponentType.Button,
    whisperTagType: 'oh-button',
  },
  {
    assignTextChildren: assignTextChildrenToProperty('label'),
    shouldSetTextChildren: () => true,
    helpsType: WhisperComponentType.Checkbox,
    whisperTagType: 'oh-checkbox',
  },
  {
    helpsType: WhisperComponentType.DateTimeInput,
    whisperTagType: 'oh-datetime',
  },
  {
    helpsType: WhisperComponentType.Divider,
    whisperTagType: 'oh-divider',
  },
  {
    helpsType: WhisperComponentType.Email,
    whisperTagType: 'oh-email',
  },
  {
    helpsType: WhisperComponentType.Icon,
    whisperTagType: 'oh-icon',
  },
  {
    assignTextChildren: assignTextChildrenToProperty('text'),
    helpsType: WhisperComponentType.Link,
    whisperTagType: 'oh-link',
  },
  {
    assignTextChildren: assignTextChildrenToProperty('body'),
    shouldSetTextChildren: () => true,
    helpsType: WhisperComponentType.Markdown,
    whisperTagType: 'oh-markdown',
  },
  {
    assignTextChildren: assignTextChildrenToProperty('body'),
    shouldSetTextChildren: () => true,
    helpsType: WhisperComponentType.Message,
    whisperTagType: 'oh-message',
  },
  {
    helpsType: WhisperComponentType.Number,
    whisperTagType: 'oh-number',
  },
  {
    helpsType: WhisperComponentType.Password,
    whisperTagType: 'oh-password',
  },
  {
    helpsType: WhisperComponentType.RadioGroup,
    whisperTagType: 'oh-radiogroup',
  },
  {
    helpsType: WhisperComponentType.SectionTitle,
    whisperTagType: 'oh-section-title',
  },
  {
    helpsType: WhisperComponentType.Telephone,
    whisperTagType: 'oh-telephone',
  },
  {
    helpsType: WhisperComponentType.TextInput,
    whisperTagType: 'oh-textinput',
  },
  {
    appendInitialChild: createAppendFunction('components'),
    helpsType: 'whisper' as any,
    whisperTagType: 'oh-whisper',
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
