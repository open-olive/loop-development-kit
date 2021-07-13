import { whisper } from '@oliveai/ldk';
import Form from './form';

export const emitFormWhisper = async (): Promise<void> => {
  const form = new Form();

  await whisper.create({
    label: 'Form Example',
    onClose: () => {
      // do nothing.
    },
    components: form.getComponents(),
  });
};
