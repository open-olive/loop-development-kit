import { NewWhisper } from ".";
import { whisper } from "..";
import { isForm, LdkForm } from "./form";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // We have to coerce any type here to force conversion of whisper.NewWhisper to OliveHelps.NewWhisper 
function convert(whisperComponentType: whisper.WhisperComponentType): any { 
  if (whisperComponentType === whisper.WhisperComponentType.Form) {
    throw new Error('unexpected form type');
  }
  return whisperComponentType;
}

export function parse(newWhisper: NewWhisper): OliveHelps.NewWhisper {
  const ldkForms: LdkForm[] = [];
  const outgoingWhisper: OliveHelps.NewWhisper = {
    ...newWhisper,
    components: []
  };

  newWhisper.components.forEach((component) => {
    if (isForm(component)) {
      // Lift form components up
      component.children.forEach(formChild => outgoingWhisper.components.push({...formChild, type: convert(formChild.type)}));

      // Store form state
      const ldkForm = new LdkForm(outgoingWhisper.components);
      ldkForms.push(ldkForm);

      // Add submit button
      const submitButton: OliveHelps.Button = {
        label: 'Submit',
        onClick: () => { component.onSubmit(ldkForm.getComponentState()) },
        type: 'button' as OliveHelps.WhisperComponentType.Button
      };
      outgoingWhisper.components.push(submitButton);
    } else {
      outgoingWhisper.components.push({...component, type: convert(component.type)});
    }
  });

  return outgoingWhisper;
}