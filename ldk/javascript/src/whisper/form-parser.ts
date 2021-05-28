import { Button, Components, NewWhisper, WhisperComponentType } from ".";
import { isForm, LdkForm } from "./form";

export function parse(whisper: NewWhisper): NewWhisper {
  const ldkForms: LdkForm[] = [];
  const outgoingWhisper: NewWhisper = {
    ...whisper,
    components: []
  };

  whisper.components.forEach((component: Components) => {
    if (isForm(component)) {
      // Lift form components up
      component.children.forEach(formChild => outgoingWhisper.components.push(formChild));

      // Store form state
      const ldkForm = new LdkForm(component.children);
      ldkForms.push(ldkForm);

      // Add submit button
      const submitButton: Button = {
        label: 'Submit',
        onClick: () => { component.onSubmit(ldkForm.getComponentState()) },
        type: WhisperComponentType.Button
      };
      outgoingWhisper.components.push(submitButton);
    } else {
      outgoingWhisper.components.push(component)
    }
  });

  return outgoingWhisper;
}