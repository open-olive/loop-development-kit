import {
  BoxChildComponent,
  Component,
  NewWhisper,
  UpdateWhisper,
  Whisper,
  WhisperComponentType,
} from './types';

export function mapToInternalChildComponent(
  component: BoxChildComponent,
): OliveHelps.ChildComponents {
  switch (component.type) {
    case WhisperComponentType.Box:
      // eslint-disable-next-line
      const { onClick } = component;
      if (onClick) {
        return {
          alignment: 'justifyContent' in component ? component.justifyContent : component.alignment,
          direction: component.direction,
          children: component.children.map(mapToInternalChildComponent),
          type: WhisperComponentType.Box,
          onClick: (error, whisper) => {
            onClick(error, mapToExternalWhisper(whisper));
          },
        } as OliveHelps.Box;
      }
      return {
        alignment: 'justifyContent' in component ? component.justifyContent : component.alignment,
        direction: component.direction,
        children: component.children.map(mapToInternalChildComponent),
        type: WhisperComponentType.Box,
      };
    case WhisperComponentType.Button:
      return {
        ...component,
        onClick: (error, whisper) => {
          component.onClick(error, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.Button;
    case WhisperComponentType.Checkbox:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.Checkbox;
    case WhisperComponentType.Email:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.Email;
    case WhisperComponentType.Link: {
      // eslint-disable-next-line
      const { onClick } = component;
      if (onClick) {
        return {
          ...component,
          onClick: (error, whisper) => {
            onClick(error, mapToExternalWhisper(whisper));
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
          component.onChange(error, param, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.NumberInput;
    case WhisperComponentType.Password:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.Password;
    case WhisperComponentType.RadioGroup:
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          component.onSelect(error, param, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.RadioGroup;
    case WhisperComponentType.Select:
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          component.onSelect(error, param, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.Select;
    case WhisperComponentType.Telephone:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.Telephone;
    case WhisperComponentType.TextInput:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper));
        },
      } as OliveHelps.TextInput;
    default:
      throw new Error('Unexpected component type');
  }
}

export function mapToInternalComponent(component: Component): OliveHelps.Components {
  switch (component.type) {
    case WhisperComponentType.CollapseBox:
      // eslint-disable-next-line
      const { onClick } = component;
      if (onClick) {
        return {
          label: component.label,
          open: component.open,
          children: component.children.map(mapToInternalChildComponent),
          type: WhisperComponentType.CollapseBox,
          onClick: (error: Error, param: boolean, whisper: OliveHelps.Whisper) => {
            onClick(error, param, mapToExternalWhisper(whisper));
          },
        } as OliveHelps.CollapseBox;
      }
      return {
        label: component.label,
        open: component.open,
        children: component.children.map(mapToInternalChildComponent),
        type: WhisperComponentType.CollapseBox,
      };
    default:
      return mapToInternalChildComponent(component);
  }
}

export function mapToInternalWhisper(whisper: UpdateWhisper): OliveHelps.UpdateWhisper;
export function mapToInternalWhisper(whisper: NewWhisper): OliveHelps.NewWhisper;
export function mapToInternalWhisper(
  whisper: NewWhisper | UpdateWhisper,
): OliveHelps.NewWhisper | OliveHelps.UpdateWhisper {
  return 'onClose' in whisper
    ? {
        label: whisper.label,
        onClose: whisper.onClose,
        components: whisper.components.map(mapToInternalComponent),
      }
    : {
        label: whisper.label,
        components: whisper.components.map(mapToInternalComponent),
      };
}

export function mapToExternalWhisper(whisper: OliveHelps.Whisper): Whisper {
  return {
    id: whisper.id,
    close: whisper.close,
    update(updateWhisper: UpdateWhisper, cb): void {
      whisper.update(mapToInternalWhisper(updateWhisper), cb);
    },
  };
}
