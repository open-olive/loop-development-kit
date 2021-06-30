import { keyboard } from '@oliveai/ldk';
import { openTestGroups } from './testGroups';

export default class SelfTestLoop {
  async start(): Promise<void> {
    console.log('Starting Self Test...');
    const hotkeys = {
      key: '/',
      control: true,
    };

    try {
      let testGroupsWhisper = await openTestGroups();
      keyboard.listenHotkey(hotkeys, async (pressed: boolean) => {
        if (pressed) {
          testGroupsWhisper.close((error) => console.log(error));
          testGroupsWhisper = await openTestGroups();
        }
      });
    } catch (e) {
      console.log('Error Streaming', 'error', e.toString());
    }
  }
}
