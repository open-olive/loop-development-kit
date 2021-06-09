import * as guide from './guide';
import * as hotkeyListener from './hotkeyListener';
import * as searchBarListener from './searchBarListener';

guide.emitInstructionsWhisper();
hotkeyListener.start();
searchBarListener.start();
