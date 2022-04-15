import { ui } from '../../dist';
import { emitFormWhisper } from './whisperManager';

const main = async () => {
  ui.loopOpenHandler(() => emitFormWhisper());
};

main().catch((e) => console.error(e));
