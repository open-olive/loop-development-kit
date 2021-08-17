import { emitFormWhisper } from './whisperManager';

const main = async () => {
  await emitFormWhisper();
};

main().catch((e) => console.error(e));
