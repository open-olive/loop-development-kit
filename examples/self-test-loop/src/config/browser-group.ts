import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as browserTests from '../tests/browser';

export const browserTestGroup = (): TestGroup =>
  new TestGroup('Browser Aptitude', [
    new LoopTest(
      'Browser Aptitude - Open Tab & Navigation Stream',
      browserTests.testOpenTabAndListenNavigation,
      10000,
      'Opening a new tab to go to oliveai.dev and receiving that event from the navigation listener',
    ),
    new LoopTest(
      'Browser Aptitude - Open Tab & Network Activity Stream',
      browserTests.testOpenTabAndListenNetworkActivity,
      10000,
      'Opening a new tab to go to oliveai.dev and waiting for network activity',
    ),
    new LoopTest(
      'Browser Aptitude - Open Window & Navigation Stream',
      browserTests.testOpenWindowAndListenNavigation,
      10000,
      'Opening a new window to go to oliveai.dev and receiving that event from the navigation listener',
    ),
    new LoopTest(
      'Browser Aptitude - Open Tab With Source',
      browserTests.testOpenTabWithSource,
      10000,
      'Opening a new tab to go to oliveai.dev and reading the source',
    ),
    new LoopTest(
      'Browser Aptitude - Open Window With Source',
      browserTests.testOpenWindowWithSource,
      10000,
      'Opening a new window to go to oliveai.dev and reading the source',
    ),
    new LoopTest(
      'Browser Aptitude - Retrieve Source',
      browserTests.testSourceHTML,
      10000,
      'Reading the source from oliveai.dev',
    ),
    new LoopTest(
      'Browser Aptitude - Tab Change Event',
      browserTests.testTabChangeEvent,
      10000,
      "Inside the new oliveai.com browser tab, navigate to the oliveai.dev tab'",
    ),
    new LoopTest(
      'Browser Aptitude - Text Selection Stream',
      browserTests.testListenTextSelection,
      10000,
      "Inside the new oliveai.dev browser tab, select the text 'Welcome to the Olive Helps Developer Hub'",
    ),
    new LoopTest(
      'Browser Aptitude - Navigation Type',
      browserTests.testListenNavigationType,
      10000,
      'Trigger both a "history" navigation event and a "real" navigation event. To trigger a "history" event, click on a menu item on the webpage that opens. To trigger a "real" navigation event by doing a page refresh.',
    ),
    new LoopTest(
      'Browser Aptitude - listen UI Element',
      browserTests.testListenUIElement,
      10000,
      "Inside oliveai.dev browser tab, click 'build loop' button. ",
    ),
  ]);
