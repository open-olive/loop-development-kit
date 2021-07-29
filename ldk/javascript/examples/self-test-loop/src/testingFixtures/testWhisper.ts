import { whisper } from '@oliveai/ldk';
import {
  Component,
  WhisperComponentType,
  Whisper,
  TextAlign,
  Urgency,
  JustifyContent,
  Direction,
  BoxChildComponent,
} from '@oliveai/ldk/dist/whisper/types';

import TestSuite from './testSuite';
import { LoopTest } from './loopTest';
import { testConfig } from '../config';
import TestGroup from './testGroup';
import WhisperCloser from './WhisperCloser';

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

const getTestLinkComponent = (group: TestGroup): BoxChildComponent => ({
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

const emitTestGroupWhisper = async (group: TestGroup): Promise<Whisper> => {
  const components: Component[] = [];
  group.getTests().forEach((test) => {
    components.push({
      type: WhisperComponentType.Link,
      textAlign: TextAlign.Left,
      onClick: async () => {
        test.setTimeoutTime(null);
        const suite = new TestSuite([test]);
        await suite.start();
      },
      text: `---${test.getId()}`,
      style: Urgency.None,
    });
  });

  return whisper.create({
    components,
    label: `Tests for the '${group.getId()}' group`,
  });
};

const getExpandLinkComponent = (
  group: TestGroup,
  whisperCloser: WhisperCloser,
): BoxChildComponent => ({
  type: WhisperComponentType.Link,
  textAlign: TextAlign.Right,
  onClick: async () => {
    whisperCloser.addWhisperToClose(await emitTestGroupWhisper(group));
  },
  text: `Expand Group >`,
  style: Urgency.None,
});

export const emitTestWhisper = async (whisperCloser: WhisperCloser): Promise<Whisper> => {
  let allTests = [] as LoopTest[];

  const clickableElements: Component[] = [];
  const keys = Object.keys(testConfig);
  for (let i = 0; i < keys.length; i += 1) {
    const group = testConfig[keys[i]];
    clickableElements.push({
      type: WhisperComponentType.Box,
      justifyContent: JustifyContent.SpaceBetween,
      direction: Direction.Horizontal,
      children: [getTestLinkComponent(group), getExpandLinkComponent(group, whisperCloser)],
    });

    allTests = allTests.concat(group.getTests());
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
