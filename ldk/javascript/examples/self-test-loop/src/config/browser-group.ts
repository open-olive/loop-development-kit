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
      'Browser Aptitude - Text Selection Stream',
      browserTests.testListenTextSelection,
      10000,
      "Inside the new oliveai.dev browser tab, select the text 'Welcome to the Olive Helps Developer Hub'",
    ),
    new LoopTest(
      'Browser Aptitude - Navigation Type',
      browserTests.testListenNavigationType,
      10000,
      'Trigger a real navigation event by doing a full page load',
    ),
  ]);
