import { Components, Form, Whisper, WhisperComponentType } from '.';

export class LdkForm {
    children: Array<Components>;
    componentState: Map<string, any>;

    constructor(children: Array<Components>) {
        this.componentState = new Map<string, any>();
        this.children = children;
        
        this.setInitialComponentState(children);
        this.registerListeners(children);
    }

    getComponentState(): Map<string, any> {
        return this.componentState;
    }

    private isOnChangeInput(child: any): boolean {
        return (child.onChange !== undefined && child.name !== undefined);
    }

    private isOnSelectInput(child: any): boolean {
        return (child.onSelect !== undefined && child.name !== undefined);
    }

    private setInitialComponentState(children: Array<any>) {
        children.forEach((child: any) => {
            if (this.isOnChangeInput(child)) {
                this.componentState = this.componentState.set(child.name, child.value);
            } else if (this.isOnSelectInput(child)) {
                this.componentState = this.componentState.set(child.name, child.selected);
            }
        });
    }

    private registerListeners(children: Array<any>) {
        children.forEach((child: any) => {
            if (this.isOnChangeInput(child)) {
                const incomingOnChange = child.onChange;
                child.onChange = (error: Error | undefined, param: string, whisper: Whisper) => {
                    this.componentState = this.componentState.set(child.name, param);
                    incomingOnChange(error, param, whisper);
                }
            } else if (this.isOnSelectInput(child)) {
                const incomingOnSelect = child.onSelect;
                child.onSelect = (error: Error | undefined, param: string, whisper: Whisper) => {
                    this.componentState = this.componentState.set(child.name, param);
                    incomingOnSelect(error, param, whisper);
                }
            }
        });
    }
}

export function isForm(component: Components): component is Form {
    return (component as Form).type === WhisperComponentType.Form
}