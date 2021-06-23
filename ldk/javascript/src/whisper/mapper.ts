import {
  BoxChildComponent,
  Component,
  NewWhisper,
  StateMap,
  UpdateWhisper,
  Whisper,
  WhisperComponentType,
} from './types';

export function mapToInternalChildComponent(
  component: BoxChildComponent,
  stateMap: StateMap,
): OliveHelps.ChildComponents {
  switch (component.type) {
    case WhisperComponentType.Box:
      // eslint-disable-next-line
      const { onClick } = component;
      if (onClick) {
        return {
          id: component.id,
          alignment: 'justifyContent' in component ? component.justifyContent : component.alignment,
          direction: component.direction,
          children: component.children.map((component) => mapToInternalChildComponent(component, stateMap)),
          type: WhisperComponentType.Box,
          onClick: (error, whisper) => {
            onClick(error, mapToExternalWhisper(whisper, stateMap));
          },
        } as OliveHelps.Box;
      }
      return {
        id: component.id,
        alignment: 'justifyContent' in component ? component.justifyContent : component.alignment,
        direction: component.direction,
        children: component.children.map((component) => mapToInternalChildComponent(component, stateMap)),
        type: WhisperComponentType.Box,
      };
    case WhisperComponentType.Button:
      return {
        ...component,
        onClick: (error, whisper) => {
          component.onClick(error, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Button;
    case WhisperComponentType.Checkbox:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Checkbox;
    case WhisperComponentType.Email:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Email;
    case WhisperComponentType.Link: {
      // eslint-disable-next-line
      const { onClick } = component;
      if (onClick) {
        return {
          ...component,
          onClick: (error, whisper) => {
            onClick(error, mapToExternalWhisper(whisper, stateMap));
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
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.NumberInput;
    case WhisperComponentType.Password:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Password;
    case WhisperComponentType.RadioGroup:
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          component.onSelect(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.RadioGroup;
    case WhisperComponentType.Select:
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          component.onSelect(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Select;
    case WhisperComponentType.Telephone:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Telephone;
    case WhisperComponentType.TextInput:
      // console.info(`mapping TextInput. id: ${component.id}, value: ${component.value}`);
      if (component.id && component.value) {
        stateMap.set(component.id, component.value);
      }
      return {
        ...component,
        onChange: (error, param, whisper) => {
          // console.info(`TextInput onChange. id: ${component.id}, value: ${param}`);
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.TextInput;
    default:
      throw new Error('Unexpected component type');
  }
}

export function mapToInternalComponent(component: Component, stateMap: StateMap): OliveHelps.Components {
  switch (component.type) {
    case WhisperComponentType.CollapseBox:
      return {
        id: component.id,
        label: component.label,
        open: component.open,
        children: component.children.map((component) => mapToInternalChildComponent(component, stateMap)),
        type: WhisperComponentType.CollapseBox,
      };
    default:
      return mapToInternalChildComponent(component, stateMap);
  }
}

// export function mapToInternalWhisper(whisper: UpdateWhisper, stateMap: StateMap): OliveHelps.UpdateWhisper;
export function mapToInternalWhisper(whisper: NewWhisper, stateMap: StateMap): OliveHelps.NewWhisper;
export function mapToInternalWhisper(
  whisper: NewWhisper | UpdateWhisper,
  stateMap: StateMap,
): OliveHelps.NewWhisper | OliveHelps.UpdateWhisper {
  // console.info(`mapToInternalWhisper ${JSON.stringify(whisper)}`);
  return 'onClose' in whisper
    ? {
        label: whisper.label,
        onClose: whisper.onClose,
        components: whisper.components.map((component) => mapToInternalComponent(component, stateMap)),
      }
    : {
        label: whisper.label,
        components: whisper.components.map((component) => mapToInternalComponent(component, stateMap)),
      };
}

export function mapToExternalWhisper(whisper: OliveHelps.Whisper, stateMap: StateMap): Whisper {
  return {
    id: whisper.id,
    close: whisper.close,
    componentState: stateMap,
    update(updateWhisper: UpdateWhisper, cb): void {
      whisper.update(mapToInternalWhisper((updateWhisper as any), stateMap), cb); // TODO: any cast...
    },
  };
}
