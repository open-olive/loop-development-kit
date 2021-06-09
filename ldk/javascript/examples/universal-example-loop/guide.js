import { whisper } from '@oliveai/ldk';

const { Markdown } = whisper.WhisperComponentType;

export const emitInstructionsWhisper = async () => {
  await whisper.create({
    label: 'Universal Example Loop',
    components: [
      {
        body: `* Press "Ctrl + n" to open the new patient intake form`,
        type: Markdown,
      },
      {
        body: `* Search for a patient by: First/Last Name, Email, Appointment Date or Appointment Time`,
        type: Markdown,
      },
    ],
  });
};
