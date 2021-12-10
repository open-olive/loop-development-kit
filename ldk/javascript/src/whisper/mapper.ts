import {
  Box,
  BoxChildComponent,
  Component,
  NewWhisper,
  StateMap,
  Breadcrumbs,
  UpdateWhisper,
  Whisper,
  WhisperComponentType,
  File,
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
): WhisperService.ChildComponents {
  const onClick = 'onClick' in component ? component.onClick : null;
  switch (component.type) {
    case WhisperComponentType.Box:
      // eslint-disable-next-line no-case-declarations
      const { justifyContent, ...otherProps } = component as Box;
      return {
        ...otherProps,
        alignment: 'justifyContent' in component ? justifyContent : component.alignment,
        children: throwForDuplicateKeys(
          component.children.map((childComponent) =>
            mapToInternalChildComponent(childComponent, stateMap),
          ),
        ),
        type: WhisperComponentType.Box,
        onClick: onClick
          ? (error, whisper) => onClick(error, mapToExternalWhisper(whisper, stateMap))
          : undefined,
      } as WhisperService.Box;
    case WhisperComponentType.Breadcrumbs:
      // eslint-disable-next-line no-case-declarations
      const { links, ...props} = component as Breadcrumbs;
      return {
        links: throwForDuplicateKeys(links.map((link)=>{
          return mapToInternalChildComponent(link, stateMap);
        })),
        ...props,
      } as WhisperService.Breadcrumbs;
    case WhisperComponentType.Button:
      return {
        ...component,
        onClick: (error, whisper) => {
          component.onClick(error, mapToExternalWhisper(whisper, stateMap));
        },
      } as WhisperService.Button;
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
      } as WhisperService.Checkbox;
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
      } as WhisperService.Email;
    case WhisperComponentType.Link: {
      return {
        ...component,
        onClick: onClick
          ? (error, whisper) => onClick(error, mapToExternalWhisper(whisper, stateMap))
          : undefined,
      } as WhisperService.Link;
    }
    case WhisperComponentType.Divider:
    case WhisperComponentType.SectionTitle:
      return component;
    case WhisperComponentType.RichTextEditor:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          if (component.id) {
            stateMap.set(component.id, param);
          }
          component.onChange(error, param, mapToExternalWhisper(whisper, stateMap));
        },
      } as WhisperService.RichTextEditor;
    case WhisperComponentType.Autocomplete: {
      // eslint-disable-next-line
      const { onChange, onSelect, options } = component;
      const dataObj = { data: options };
      return {
        ...component,
        options: options ? JSON.stringify(dataObj) : undefined,
        onChange: onChange
          ? (error, param, whisper) => {
              onChange(error, param, mapToExternalWhisper(whisper, stateMap));
            }
          : undefined,
        onSelect: onSelect
          ? (error, param, whisper) => {
              if (component.id) {
                stateMap.set(component.id, param);
              }
              onSelect(error, param, mapToExternalWhisper(whisper, stateMap));
            }
          : undefined,
      } as WhisperService.Autocomplete;
    }
    case WhisperComponentType.DropZone:
      return {
        ...component,
        onDrop: (error, param, whisper) => {
          const callbackHandler: (file: WhisperService.File) => File = (
            file: WhisperService.File,
          ) => ({
            path: file.path,
            size: file.size,
            readFile: () =>
              new Promise<Uint8Array>((resolve, reject) => {
                file.readFile((readError, buffer) => {
                  if (readError) {
                    return reject(readError);
                  }
                  return resolve(new Uint8Array(buffer));
                });
              }),
          });
          component.onDrop(
            error,
            param.map(callbackHandler),
            mapToExternalWhisper(whisper, stateMap),
          );
        },
      };
    case WhisperComponentType.ListPair: {
      // eslint-disable-next-line
      const { onCopy } = component;
      if (onCopy) {
        return {
          ...component,
          onCopy: (error, param, whisper) => {
            onCopy(error, param, mapToExternalWhisper(whisper, stateMap));
          },
        } as WhisperService.ListPair;
      }
      return component as WhisperService.ListPair;
    }
    case WhisperComponentType.Message: {
      // eslint-disable-next-line
      const { onCopy } = component;
      if (onCopy) {
        return {
          ...component,
          onCopy: (error, whisper) => {
            onCopy(error, mapToExternalWhisper(whisper, stateMap));
          },
        } as WhisperService.Message;
      }
      return component as WhisperService.Message;
    }
    case WhisperComponentType.Markdown: {
      // eslint-disable-next-line
      const { onCopy } = component;
      if (onCopy) {
        return {
          ...component,
          onCopy: (error, whisper) => {
            onCopy(error, mapToExternalWhisper(whisper, stateMap));
          },
        } as WhisperService.Markdown;
      }
      return component as WhisperService.Markdown;
    }
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
      } as WhisperService.NumberInput;
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
      } as WhisperService.Password;
    case WhisperComponentType.Progress:
      return component;
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
      } as WhisperService.RadioGroup;
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
      } as WhisperService.Select;
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
      } as WhisperService.Telephone;
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
      } as WhisperService.TextInput;
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
      } as WhisperService.DateTimeInput;
    case WhisperComponentType.Icon:
      // eslint-disable-next-line
      const onIconClick = component.onClick;
      if (onIconClick) {
        return {
          ...component,
          onClick: (error, whisper) => {
            onIconClick(error, mapToExternalWhisper(whisper, stateMap));
          },
        } as WhisperService.Icon;
      }
      return component as WhisperService.Icon;
    default:
      // Suppressing warning to deal with unexpected types.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unexpected component type: ${(component as any)?.type}`);
  }
}

export function mapToInternalComponent(
  component: Component,
  stateMap: StateMap,
): WhisperService.Components {
  switch (component.type) {
    case WhisperComponentType.CollapseBox:
      // eslint-disable-next-line no-case-declarations
      const onClick = 'onClick' in component ? component.onClick : null;
      return {
        ...component,
        children: throwForDuplicateKeys(
          component.children.map((childComponent) =>
            mapToInternalChildComponent(childComponent, stateMap),
          ),
        ),
        type: WhisperComponentType.CollapseBox,
        onClick: onClick
          ? (error, param, whisper) =>
              onClick(error, param, mapToExternalWhisper(whisper, stateMap))
          : undefined,
      } as WhisperService.CollapseBox;
    default:
      return mapToInternalChildComponent(component, stateMap);
  }
}

export function mapToInternalWhisper(
  whisper: NewWhisper,
  stateMap: StateMap,
): WhisperService.NewWhisper;
export function mapToInternalWhisper(
  whisper: UpdateWhisper,
  stateMap: StateMap,
): WhisperService.UpdateWhisper;
export function mapToInternalWhisper(
  whisper: NewWhisper | UpdateWhisper,
  stateMap: StateMap,
): WhisperService.NewWhisper | WhisperService.UpdateWhisper {
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

export function mapToExternalWhisper(whisper: WhisperService.Whisper, stateMap: StateMap): Whisper {
  return {
    id: whisper.id,
    close: whisper.close,
    componentState: stateMap,
    update(updateWhisper: UpdateWhisper, cb): void {
      whisper.update(mapToInternalWhisper(updateWhisper, stateMap), cb);
    },
  };
}
