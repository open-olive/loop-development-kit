/* eslint-disable @typescript-eslint/no-explicit-any */ // We need to dynamically map child components to determine if they are onChange or onSelect flavored inputs.
import { Components, Form, Whisper, WhisperComponentType } from '.';

export class LdkForm {
  children: Array<OliveHelps.Components>;

  componentState: Map<string, string | number | boolean>;

  constructor(children: Array<OliveHelps.Components>) {
    this.componentState = new Map<string, string | number | boolean>();
    this.children = children;

    this.setInitialComponentState(this.children);
    this.registerListeners(this.children);
  }

  getComponentState(): Map<string, string | number | boolean> {
    return this.componentState;
  }

  private isOnChangeInput(child: any): boolean {
    return child.onChange && child.name;
  }

  private isOnSelectInput(child: any): boolean {
    return child.onSelect && child.name;
  }

  private setInitialComponentState(children: Array<any>) {
    children?.forEach((child: any) => {
      if (this.isOnChangeInput(child)) {
        this.componentState.set(child.name, child.value);
      } else if (this.isOnSelectInput(child)) {
        this.componentState.set(child.name, child.selected);
      }
    });
  }

  private registerListeners(children: Array<any>) {
    children?.forEach((child: any) => {
      if (this.isOnChangeInput(child)) {
        const incomingOnChange = child.onChange;
        child.onChange = (error: Error | undefined, param: string, whisper: Whisper) => {
          // eslint-disable-line no-param-reassign
          this.componentState.set(child.name, param);
          incomingOnChange(error, param, whisper);
        };
      } else if (this.isOnSelectInput(child)) {
        const incomingOnSelect = child.onSelect;
        child.onSelect = (error: Error | undefined, param: string, whisper: Whisper) => {
          // eslint-disable-line no-param-reassign
          this.componentState.set(child.name, param);
          incomingOnSelect(error, param, whisper);
        };
      }
    });
  }
}

export function isForm(component: Components): component is Form {
  return (component as Form).type === WhisperComponentType.Form;
}
