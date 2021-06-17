import { Components } from '.';
import { isForm, LdkForm } from './form';

export const ldkForms: LdkForm[] = [];

export function parseForm(components: Array<Components>): Array<OliveHelps.Components> {
  const outgoingComponents: Array<OliveHelps.Components> = [];

  components.forEach((component) => {
    if (isForm(component)) {
      // Lift form components up
      const formChildren: Array<OliveHelps.Components> = []; // We have to coerce any type here to force conversion of whisper.Components to OliveHelps.Components

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ component.children.forEach(
        (formChild) => formChildren.push({ ...formChild, type: formChild.type as any }),
      );
      outgoingComponents.push(...formChildren);

      // Store form state
      const ldkForm = new LdkForm(formChildren);
      ldkForms.push(ldkForm);

      // Add submit button
      const submitButton: OliveHelps.Button = {
        label: 'Submit',
        onClick: () => {
          component.onSubmit(ldkForm.getComponentState());
        },
        type: 'button' as OliveHelps.WhisperComponentType.Button,
      };
      outgoingComponents.push(submitButton);
    } else {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // We have to coerce any type here to force conversion of whisper.Components to OliveHelps.Components
      outgoingComponents.push({ ...component, type: component.type as any });
    }
  });

  return outgoingComponents;
}
