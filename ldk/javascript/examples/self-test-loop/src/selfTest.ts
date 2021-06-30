import { keyboard } from '@oliveai/ldk';
import { emitTestWhisper } from './testingFixtures/testWhisper';
import WhisperCloser from './testingFixtures/WhisperCloser';

export default class SelfTestLoop {
  async start(): Promise<void> {
    console.log('Starting Self Test...');
    const whisperCloser = new WhisperCloser();
    const hotkeys = {
      key: '/',
      control: true,
    };

    try {
      whisperCloser.addWhisperToClose(await emitTestWhisper(whisperCloser));
      keyboard.listenHotkey(hotkeys, async (pressed: boolean) => {
        if (pressed) {
          whisperCloser.run();
          whisperCloser.addWhisperToClose(await emitTestWhisper(whisperCloser));
        }
      });
    } catch (e) {
      console.log('Error Streaming', 'error', e.toString());
    }
  }
}
