import { ui } from '../../../dist';
import SelfTestLoop from './selfTest';

async function main() {
  const selfTest = new SelfTestLoop();
  selfTest.start();
  console.log('end');
}

ui.loopOpenHandler(() => {
  main().catch((e) => console.log('something bad happened :(', e));
});
