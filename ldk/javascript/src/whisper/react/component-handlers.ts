/* eslint-disable */
import { Instance, Props, TextInstance } from './renderer-config';
import { WhisperComponentType } from '../types';
import { HelpsComponents } from './component-types';

function createAppendFunction(
  childPropertyName: string,
  excludeChildrenTypes: WhisperComponentType[] = [],
): (instance: Instance, child: Instance | TextInstance) => boolean {
  return (instance, child) => {
    if ((instance as any)[childPropertyName] == null) {
      (instance as any)[childPropertyName] = [];
    }
    if (excludeChildrenTypes.includes(child.type)) {
      return false;
    }
    (instance as any)[childPropertyName].push(child);
    return true;
  };
}

interface ComponentSpecificHandler {
  appendInitialChild?: (parentInstance: Instance, child: Instance | TextInstance) => boolean;

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

  whisperTagType: keyof HelpsComponents;
}

const autoCompleteHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Autocomplete,
  whisperTagType: 'oh-autocomplete',
};

const boxHandler: ComponentSpecificHandler = {
  appendInitialChild: createAppendFunction('children', [WhisperComponentType.CollapseBox]),
  helpsType: WhisperComponentType.Box,
  whisperTagType: 'oh-box',
};
const collapseBoxHandler: ComponentSpecificHandler = {
  appendInitialChild: createAppendFunction('children'),
  helpsType: WhisperComponentType.CollapseBox,
  whisperTagType: 'oh-collapse-box',
};
const buttonHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Button,
  whisperTagType: 'oh-button',
};
const checkboxHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Checkbox,
  whisperTagType: 'oh-checkbox',
};
const dateTimeHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.DateTimeInput,
  whisperTagType: 'oh-datetime',
};
const dividerHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Divider,
  whisperTagType: 'oh-divider',
};
const dropZoneHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.DropZone,
  whisperTagType: 'oh-drop-zone',
};
const emailHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Email,
  whisperTagType: 'oh-email',
};
const iconHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Icon,
  whisperTagType: 'oh-icon',
};
const linkHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Link,
  whisperTagType: 'oh-link',
};
const listPairHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.ListPair,
  whisperTagType: 'oh-list-pair',
};
const markdownHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Markdown,
  whisperTagType: 'oh-markdown',
};
const messageHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Message,
  whisperTagType: 'oh-message',
};
const numberHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Number,
  whisperTagType: 'oh-number',
};
const passwordHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Password,
  whisperTagType: 'oh-password',
};
const radioGroupHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.RadioGroup,
  whisperTagType: 'oh-radio-group',
};
const sectionTitleHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.SectionTitle,
  whisperTagType: 'oh-section-title',
};
const selectHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Select,
  whisperTagType: 'oh-select',
};
const telephoneHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Telephone,
  whisperTagType: 'oh-telephone',
};
const textInputHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.TextInput,
  whisperTagType: 'oh-text-input',
};
const whisperHandler: ComponentSpecificHandler = {
  appendInitialChild: createAppendFunction('components'),
  helpsType: 'whisper' as any,
  whisperTagType: 'oh-whisper',
};

function assertUnreachable(_: never): never {
  throw new Error(`Unexpected Type: ${_}`);
}

export function getHandlerByHelpsType(type: WhisperComponentType): ComponentSpecificHandler {
  if ((type as string) === 'whisper') {
    return whisperHandler;
  }
  switch (type) {
    case WhisperComponentType.Autocomplete:
      return autoCompleteHandler;
    case WhisperComponentType.Box:
      return boxHandler;
    case WhisperComponentType.Button:
      return buttonHandler;
    case WhisperComponentType.Checkbox:
      return checkboxHandler;
    case WhisperComponentType.CollapseBox:
      return collapseBoxHandler;
    case WhisperComponentType.DateTimeInput:
      return dateTimeHandler;
    case WhisperComponentType.Divider:
      return dividerHandler;
    case WhisperComponentType.DropZone:
      return dropZoneHandler;
    case WhisperComponentType.Email:
      return emailHandler;
    case WhisperComponentType.Icon:
      return iconHandler;
    case WhisperComponentType.Link:
      return linkHandler;
    case WhisperComponentType.ListPair:
      return listPairHandler;
    case WhisperComponentType.Markdown:
      return markdownHandler;
    case WhisperComponentType.Message:
      return messageHandler;
    case WhisperComponentType.Number:
      return numberHandler;
    case WhisperComponentType.Password:
      return passwordHandler;
    case WhisperComponentType.RadioGroup:
      return radioGroupHandler;
    case WhisperComponentType.Select:
      return selectHandler;
    case WhisperComponentType.Telephone:
      return telephoneHandler;
    case WhisperComponentType.TextInput:
      return textInputHandler;
    case WhisperComponentType.SectionTitle:
      return sectionTitleHandler;
    default:
      assertUnreachable(type);
  }
  // Do not put a return or throw statement here, that should be caught by the
  // assert unreachable function in default branch.
}

export function getHandlerByTagType(tagType: keyof HelpsComponents): ComponentSpecificHandler {
  switch (tagType) {
    case 'oh-autocomplete':
      return autoCompleteHandler;
    case 'oh-box':
      return boxHandler;
    case 'oh-button':
      return buttonHandler;
    case 'oh-checkbox':
      return checkboxHandler;
    case 'oh-collapse-box':
      return collapseBoxHandler;
    case 'oh-datetime':
      return dateTimeHandler;
    case 'oh-divider':
      return dividerHandler;
    case 'oh-drop-zone':
      return dropZoneHandler;
    case 'oh-email':
      return emailHandler;
    case 'oh-icon':
      return iconHandler;
    case 'oh-link':
      return linkHandler;
    case 'oh-list-pair':
      return listPairHandler;
    case 'oh-markdown':
      return markdownHandler;
    case 'oh-message':
      return messageHandler;
    case 'oh-number':
      return numberHandler;
    case 'oh-password':
      return passwordHandler;
    case 'oh-radio-group':
      return radioGroupHandler;
    case 'oh-select':
      return selectHandler;
    case 'oh-section-title':
      return sectionTitleHandler;
    case 'oh-telephone':
      return telephoneHandler;
    case 'oh-text-input':
      return textInputHandler;
    case 'oh-whisper':
      return whisperHandler;
    default:
      assertUnreachable(tagType);
  }
  // Do not put a return or throw statement here, that should be caught by the
  // assert unreachable function in default branch.
}
