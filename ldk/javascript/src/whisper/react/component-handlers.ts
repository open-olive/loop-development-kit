/* eslint-disable @typescript-eslint/no-explicit-any -- internal work - comfortable with risk */
import { ComponentTypeWithWhisper, Instance, Props, TextInstance } from './renderer-config';
import { WhisperComponentType } from '../types';
import { HelpsComponents } from './component-types';

function createAppendFunction(
  childPropertyName: string,
  excludeChildrenTypes: ComponentTypeWithWhisper[] = [],
): (instance: Instance, child: Instance | TextInstance) => boolean {
  return (instance, child) => {
    if ((instance as any)[childPropertyName] == null) {
      // eslint-disable-next-line no-param-reassign -- need to modify param.
      (instance as any)[childPropertyName] = [];
    }
    if (excludeChildrenTypes.includes(child.type) || child.type === 'whisper') {
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
  appendInitialChild: createAppendFunction('children'),
  helpsType: WhisperComponentType.Box,
  whisperTagType: 'oh-box',
};
const collapseBoxHandler: ComponentSpecificHandler = {
  appendInitialChild: createAppendFunction('children'),
  helpsType: WhisperComponentType.CollapseBox,
  whisperTagType: 'oh-collapse-box',
};
const breadcrumbsHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Breadcrumbs,
  whisperTagType: 'oh-breadcrumbs',
};
const buttonHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Button,
  whisperTagType: 'oh-button',
};
const chartHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Chart,
  whisperTagType: 'oh-chart',
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
const gridHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Grid,
  whisperTagType: 'oh-grid',
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
const paginationHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Pagination,
  whisperTagType: 'oh-pagination',
};
const passwordHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Password,
  whisperTagType: 'oh-password',
};
const progressHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Progress,
  whisperTagType: 'oh-progress',
};
const radioGroupHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.RadioGroup,
  whisperTagType: 'oh-radio-group',
};
const ratingHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.Rating,
  whisperTagType: 'oh-rating',
};
const richTextEditorHandler: ComponentSpecificHandler = {
  helpsType: WhisperComponentType.RichTextEditor,
  whisperTagType: 'oh-rich-text-editor',
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

// eslint-disable-next-line consistent-return
export function getHandlerByHelpsType(type: ComponentTypeWithWhisper): ComponentSpecificHandler {
  switch (type) {
    case 'whisper':
      return whisperHandler;
    case WhisperComponentType.Autocomplete:
      return autoCompleteHandler;
    case WhisperComponentType.Box:
      return boxHandler;
    case WhisperComponentType.Breadcrumbs:
      return breadcrumbsHandler;
    case WhisperComponentType.Button:
      return buttonHandler;
    case WhisperComponentType.Chart:
      return chartHandler;
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
    case WhisperComponentType.Grid:
      return gridHandler;
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
    case WhisperComponentType.Pagination:
      return paginationHandler;
    case WhisperComponentType.Password:
      return passwordHandler;
    case WhisperComponentType.Progress:
      return progressHandler;
    case WhisperComponentType.RadioGroup:
      return radioGroupHandler;
    case WhisperComponentType.Rating:
      return ratingHandler;
    case WhisperComponentType.RichTextEditor:
      return richTextEditorHandler;
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

// eslint-disable-next-line consistent-return
export function getHandlerByTagType(tagType: keyof HelpsComponents): ComponentSpecificHandler {
  switch (tagType) {
    case 'oh-autocomplete':
      return autoCompleteHandler;
    case 'oh-box':
      return boxHandler;
    case 'oh-breadcrumbs':
      return breadcrumbsHandler;
    case 'oh-button':
      return buttonHandler;
    case 'oh-chart':
      return chartHandler;
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
    case 'oh-grid':
      return gridHandler;
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
    case 'oh-pagination':
      return paginationHandler;
    case 'oh-password':
      return passwordHandler;
    case 'oh-progress':
      return progressHandler;
    case 'oh-radio-group':
      return radioGroupHandler;
    case 'oh-rating':
      return ratingHandler;
    case 'oh-rich-text-editor':
      return richTextEditorHandler;
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
