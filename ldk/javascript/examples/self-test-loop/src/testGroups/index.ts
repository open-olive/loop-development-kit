import { whisper } from '@oliveai/ldk';
import {
  Component,
  WhisperComponentType,
  Whisper,
  TextAlign,
  Urgency,
} from '@oliveai/ldk/dist/whisper/types';

import TestSuite from '../testingFixtures/testSuite';
import { LoopTest } from '../testingFixtures/loopTest';
import { testConfig } from '../config';
import TestGroup from '../testingFixtures/testGroup';

const emitGroupDoneWhisper = async (group: TestGroup) => {
  const form = await whisper.create({
    label: 'Testing Complete',
    onClose: () => {
      console.log('');
    },
    components: [
      {
        body: `All tests for ${group.getId()} have been run`,
        type: WhisperComponentType.Markdown,
      },
    ],
  });
  setTimeout(() => {
    form.close((error) => console.error(error));
  }, 5000);
};

const emitTestingCompleteWhisper = async () => {
  const prompt = await whisper.create({
    label: 'Testing Complete',
    onClose: () => {
      console.log('');
    },
    components: [
      {
        body: 'All tests have been run',
        type: WhisperComponentType.Markdown,
      },
    ],
  });
  setTimeout(() => {
    prompt.close((error) => console.error(error));
  }, 5000);
};

export const openTestGroups = async (): Promise<Whisper> => {
  let allTests = [] as LoopTest[];

  const clickableElements: Component[] = [];
  const keys = Object.keys(testConfig);
  for (let i = 0; i < keys.length; i += 1) {
    const group: TestGroup = testConfig[keys[i]];
    clickableElements.push({
      type: WhisperComponentType.Link,
      textAlign: TextAlign.Left,
      onClick: async () => {
        const suite = new TestSuite(group.getTests());
        await suite.start();
        console.log('🎉 Group Done!');
        await emitGroupDoneWhisper(group);
      },
      text: `---${group.getId()}`,
      style: Urgency.None,
    });
    allTests = allTests.concat(testConfig[keys[i]].getTests());
  }

  clickableElements.push({
    type: WhisperComponentType.Link,
    textAlign: TextAlign.Left,
    onClick: async () => {
      const suite = new TestSuite(allTests);
      await suite.start();
      console.info('🎉 Done!');
      await emitTestingCompleteWhisper();
    },
    text: 'Run All Tests',
    style: Urgency.None,
  });

  return whisper.create({
    label: 'Self Test Loop',
    onClose: () => {
      console.log('closed Self Test whisper');
    },
    components: clickableElements,
  });
};
