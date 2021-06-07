import { Components, NewWhisper, UpdateWhisper } from ".";
import { isForm, LdkForm } from "./form";
import { convertComponentType } from "./whisper-mapper";

export const ldkForms: LdkForm[] = [];

function generateForm(components: Array<Components>): Array<OliveHelps.Components> {
  const outgoingComponents: Array<OliveHelps.Components> = [];
  
  components.forEach((component) => {
    if (isForm(component)) {
      // Lift form components up
      const formChildren: Array<OliveHelps.Components> = [];
      component.children.forEach(formChild => formChildren.push({...formChild, type: convertComponentType(formChild.type)}));
      outgoingComponents.push(...formChildren);

      // Store form state
      const ldkForm = new LdkForm(formChildren);
      ldkForms.push(ldkForm);

      // Add submit button
      const submitButton: OliveHelps.Button = {
        label: 'Submit',
        onClick: () => { component.onSubmit(ldkForm.getComponentState()) },
        type: 'button' as OliveHelps.WhisperComponentType.Button
      };
      outgoingComponents.push(submitButton);
    } else {
      outgoingComponents.push({...component, type: convertComponentType(component.type)});
    }
  });

  return outgoingComponents;
}

export function convertExternalNewWhisperToInternal(newWhisper: NewWhisper): OliveHelps.NewWhisper {  
  return {
    ...newWhisper,
    components: generateForm(newWhisper.components)
  };
}

export function convertExternalUpdateWhisperToInternal(updateWhisper: UpdateWhisper): OliveHelps.UpdateWhisper {
  return {
    ...updateWhisper,
    components: generateForm(updateWhisper.components)
  };
}