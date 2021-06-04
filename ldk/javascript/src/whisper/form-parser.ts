import { Components, NewWhisper, UpdateWhisper } from ".";
import { isForm, LdkForm } from "./form";
import { convert } from "./whisper-mapper";


export function generateForm(components: Array<Components>): Array<OliveHelps.Components> {
  const ldkForms: LdkForm[] = [];
  const outgoingComponents: Array<OliveHelps.Components> = [];
  
  components.forEach((component) => {
    if (isForm(component)) {
      // Lift form components up
      component.children.forEach(formChild => outgoingComponents.push({...formChild, type: convert(formChild.type)}));

      // Store form state
      const ldkForm = new LdkForm(outgoingComponents);
      ldkForms.push(ldkForm);

      // Add submit button
      const submitButton: OliveHelps.Button = {
        label: 'Submit',
        onClick: () => { component.onSubmit(ldkForm.getComponentState()) },
        type: 'button' as OliveHelps.WhisperComponentType.Button
      };
      outgoingComponents.push(submitButton);
    } else {
      outgoingComponents.push({...component, type: convert(component.type)});
    }
  });
  return outgoingComponents;
}

export function parseNewWhisper(newWhisper: NewWhisper): OliveHelps.NewWhisper {  
  return {
    ...newWhisper,
    components: generateForm(newWhisper.components)
  };
}

export function parseUpdateWhisper(updateWhisper: UpdateWhisper): OliveHelps.UpdateWhisper {
  return {
    ...updateWhisper,
    components: generateForm(updateWhisper.components)
  };
}