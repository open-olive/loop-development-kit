import { ui } from '../../dist';
import * as guide from './guide';
import * as hotkeyListener from './hotkeyListener';
import * as searchBarListener from './searchBarListener';

ui.loopOpenHandler(() => guide.emitInstructionsWhisper());

hotkeyListener.start();
searchBarListener.start();
