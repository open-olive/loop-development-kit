import {
  BoxChildComponent,
  Component,
  NewWhisper,
  StateMap,
  UpdateWhisper,
  Whisper,
  WhisperComponentType,
} from './types';

function throwForDuplicateKeys<T extends { key?: string }>(components: T[]): T[] {
  const keySet = new Set<string>();
  components.forEach((item) => {
    if (item.key === undefined) {
      return;
    }
    if (keySet.has(item.key)) {
      throw new Error(
        `Duplicate Key ${item.key} encountered, provided keys must be unique among its siblings`,
      );
    }
    keySet.add(item.key);
  });
  return components;
}

export function mapToInternalChildComponent(
  component: BoxChildComponent,
  stateMap: StateMap,
): OliveHelps.ChildComponents {
  switch (component.type) {
    case WhisperComponentType.Box:
      // eslint-disable-next-line
      const { onClick } = component;
      console.log(component.alignItems);
      if (onClick) {
        return {
          ...component,
          alignment: 'justifyContent' in component ? component.justifyContent : component.alignment,
          children: throwForDuplicateKeys(
            component.children.map((childComponent) =>
              mapToInternalChildComponent(childComponent, stateMap),
            ),
          ),
          type: WhisperComponentType.Box,
          onClick: (error, whisper) => {
            onClick(error, mapToExternalWhisper(whisper, stateMap));
          },
        } as OliveHelps.Box;
      }
      return {
        id: component.id,
        alignItems: component.alignItems,
        alignment: 'justifyContent' in component ? component.justifyContent : component.alignment,
        direction: component.direction,
        key: component.key,
        children: throwForDuplicateKeys(
          component.children.map((childComponent) =>
            mapToInternalChildComponent(childComponent, stateMap),
          ),
        ),
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
      if (component.id && component.value) {
        stateMap.set(component.id, component.value);
      }
      return {
        ...component,
        onChange: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Checkbox;
    case WhisperComponentType.Email:
      if (component.id && component.value) {
        stateMap.set(component.id, component.value);
      }
      return {
        ...component,
        onChange: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
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
      if (component.id && component.value) {
        stateMap.set(component.id, component.value);
      }
      return {
        ...component,
        onChange: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.NumberInput;
    case WhisperComponentType.Password:
      if (component.id && component.value) {
        stateMap.set(component.id, component.value);
      }
      return {
        ...component,
        onChange: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Password;
    case WhisperComponentType.RadioGroup:
      if (component.id && component.selected) {
        stateMap.set(component.id, component.selected);
      }
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onSelect(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.RadioGroup;
    case WhisperComponentType.Select:
      if (component.id && component.selected) {
        stateMap.set(component.id, component.selected);
      }
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onSelect(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Select;
    case WhisperComponentType.Telephone:
      if (component.id && component.value) {
        stateMap.set(component.id, component.value);
      }
      return {
        ...component,
        onChange: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.Telephone;
    case WhisperComponentType.TextInput:
      if (component.id && component.value) {
        stateMap.set(component.id, component.value);
      }
      return {
        ...component,
        onChange: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.TextInput;
    case WhisperComponentType.DateTimeInput:
      if (component.id && component.value) {
        stateMap.set(component.id, component.value.toISOString());
      }
      return {
        ...component,
        value: component.value?.toISOString(),
        max: component.max?.toISOString(),
        min: component.min?.toISOString(),
        onChange: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as OliveHelps.DateTimeInput;
    default:
      throw new Error('Unexpected component type');
  }
}

export function mapToInternalComponent(
  component: Component,
  stateMap: StateMap,
): OliveHelps.Components {
  switch (component.type) {
    case WhisperComponentType.CollapseBox:
      // eslint-disable-next-line no-case-declarations
      const { onClick } = component;
      if (onClick) {
        return {
          label: component.label,
          open: component.open,
          key: component.key,
          children: throwForDuplicateKeys(
            component.children.map((childComponent) =>
              mapToInternalChildComponent(childComponent, stateMap),
            ),
          ),
          type: WhisperComponentType.CollapseBox,
          onClick: (error: Error, param: boolean, whisper: OliveHelps.Whisper) => {
            onClick(error, param, mapToExternalWhisper(whisper, stateMap));
          },
        } as OliveHelps.CollapseBox;
      }
      return {
        id: component.id,
        label: component.label,
        open: component.open,
        key: component.key,
        children: throwForDuplicateKeys(
          component.children.map((childComponent) =>
            mapToInternalChildComponent(childComponent, stateMap),
          ),
        ),
        type: WhisperComponentType.CollapseBox,
      };
    default:
      return mapToInternalChildComponent(component, stateMap);
  }
}

export function mapToInternalWhisper(
  whisper: NewWhisper,
  stateMap: StateMap,
): OliveHelps.NewWhisper;
export function mapToInternalWhisper(
  whisper: UpdateWhisper,
  stateMap: StateMap,
): OliveHelps.UpdateWhisper;
export function mapToInternalWhisper(
  whisper: NewWhisper | UpdateWhisper,
  stateMap: StateMap,
): OliveHelps.NewWhisper | OliveHelps.UpdateWhisper {
  return 'onClose' in whisper
    ? {
        label: whisper.label,
        onClose: whisper.onClose,
        components: throwForDuplicateKeys(
          whisper.components.map((component) => mapToInternalComponent(component, stateMap)),
        ),
      }
    : {
        label: whisper.label,
        components: throwForDuplicateKeys(
          whisper.components.map((component) => mapToInternalComponent(component, stateMap)),
        ),
      };
}

export function mapToExternalWhisper(whisper: OliveHelps.Whisper, stateMap: StateMap): Whisper {
  return {
    id: whisper.id,
    close: whisper.close,
    componentState: stateMap,
    update(updateWhisper: UpdateWhisper, cb): void {
      whisper.update(mapToInternalWhisper(updateWhisper, stateMap), cb);
    },
  };
}
