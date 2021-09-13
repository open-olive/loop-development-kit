import * as React from 'react';
import * as Renderer from '@oliveai/ldk/dist/whisper/react/renderer';

export const emitInstructionsWhisper = async () => {
  const openMessage = `* Press "Ctrl + n" to open the new patient intake form`;
  const selectMessage = `* Search for a patient by: First/Last Name, Email, Appointment Date or Appointment Time`;
  await Renderer.renderNewWhisper(
    <oh-whisper label="Universal Example Loop" onClose={() => {}}>
      <oh-markdown body={openMessage} />
      <oh-markdown body={selectMessage} />
    </oh-whisper>,
  );
};
