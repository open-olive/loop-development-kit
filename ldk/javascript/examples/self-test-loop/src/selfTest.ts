import { keyboard } from '@oliveai/ldk';
import { openTestGroups } from './testGroups';
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
      whisperCloser.addWhisperToClose(await openTestGroups(whisperCloser));
      keyboard.listenHotkey(hotkeys, async (pressed: boolean) => {
        if (pressed) {
          whisperCloser.closeAllWhispers();
          whisperCloser.addWhisperToClose(await openTestGroups(whisperCloser));
        }
      });
    } catch (e) {
      console.log('Error Streaming', 'error', e.toString());
    }
  }
}
