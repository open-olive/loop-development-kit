import { Whisper } from '@oliveai/ldk/dist/whisper';

export default class WhisperCloser {
  whispersToClose: Whisper[] = [];

  addWhisperToClose(whisper: Whisper): void {
    this.whispersToClose.push(whisper);
  }

  run(): void {
    this.whispersToClose.forEach((whisper) => {
      whisper.close((error) => {
        console.log(error);
      });
    });
    this.whispersToClose = [];
  }
}
