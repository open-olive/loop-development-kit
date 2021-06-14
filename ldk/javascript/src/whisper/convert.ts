import {
  BoxChildComponent,
  Component,
  NewWhisper,
  UpdateWhisper,
  Whisper,
  WhisperComponentType,
} from './types';

export function convertToInternalChildComponent(
  component: BoxChildComponent,
): OliveHelps.ChildComponents {
  switch (component.type) {
    case WhisperComponentType.Box:
      return {
        alignment: 'justifyContent' in component ? component.justifyContent : component.alignment,
        direction: component.direction,
        children: component.children.map(convertToInternalChildComponent),
        type: WhisperComponentType.Box,
      };
    case WhisperComponentType.Button:
      return {
        ...component,
        onClick: (error, whisper) => {
          component.onClick(error, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.Button;
    case WhisperComponentType.Checkbox:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.Checkbox;
    case WhisperComponentType.Email:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.Email;
    case WhisperComponentType.Link: {
      const { onClick } = component;
      if (onClick) {
        return {
          ...component,
          onClick: (error, whisper) => {
            onClick(error, convertToExternalWhisper(whisper));
          },
        } as OliveHelps.Link;
      }
      return component as OliveHelps.Link;
    }
    case WhisperComponentType.Divider:
    case WhisperComponentType.ListPair:
    case WhisperComponentType.Markdown:
    case WhisperComponentType.Message:
      return component;
    case WhisperComponentType.Number:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.NumberInput;
    case WhisperComponentType.Password:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.Password;
    case WhisperComponentType.RadioGroup:
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          component.onSelect(error, param, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.RadioGroup;
    case WhisperComponentType.Select:
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          component.onSelect(error, param, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.Select;
    case WhisperComponentType.Telephone:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.Telephone;
    case WhisperComponentType.TextInput:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertToExternalWhisper(whisper));
        },
      } as OliveHelps.TextInput;
    default:
      throw new Error('Unexpected component type');
  }
}

export function convertToInternalComponent(component: Component): OliveHelps.Components {
  switch (component.type) {
    case WhisperComponentType.CollapseBox:
      return {
        label: component.label,
        open: component.open,
        children: component.children.map(convertToInternalChildComponent),
        type: WhisperComponentType.CollapseBox,
      };
    default:
      return convertToInternalChildComponent(component);
  }
}

export function convertToInternalWhisper(whisper: UpdateWhisper): OliveHelps.UpdateWhisper;
export function convertToInternalWhisper(whisper: NewWhisper): OliveHelps.NewWhisper;
export function convertToInternalWhisper(
  whisper: NewWhisper | UpdateWhisper,
): OliveHelps.NewWhisper | OliveHelps.UpdateWhisper {
  return 'onClose' in whisper
    ? {
        label: whisper.label,
        onClose: whisper.onClose,
        components: whisper.components.map(convertToInternalComponent),
      }
    : {
        label: whisper.label,
        components: whisper.components.map(convertToInternalComponent),
      };
}

export function convertToExternalWhisper(whisper: OliveHelps.Whisper): Whisper {
  return {
    id: whisper.id,
    close: whisper.close,
    update(updateWhisper: UpdateWhisper, cb): void {
      whisper.update(convertToInternalWhisper(updateWhisper), cb);
    },
  };
}
