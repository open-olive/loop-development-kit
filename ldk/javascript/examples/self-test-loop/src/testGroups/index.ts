import { whisper } from '@oliveai/ldk';

import TestSuite from '../testingFixtures/testSuite';
import { LoopTest } from '../testingFixtures/loopTest';
import { testConfig } from '../config';
import TestGroup from '../testingFixtures/testGroup';

export const openTestGroups = (): Promise<whisper.Whisper> => {
  let allTests = [] as LoopTest[];

  const clickableElements: whisper.Component[] = [];
  const keys = Object.keys(testConfig);
  for (let i = 0; i < keys.length; i += 1) {
    const group: TestGroup = testConfig[keys[i]];
    clickableElements.push({
      type: whisper.WhisperComponentType.Link,
      textAlign: whisper.TextAlign.Left,
      onClick: () => {
        const suite = new TestSuite(group.getTests());
        suite.start().then(async () => {
          console.log('🎉 Group Done!');
          const form: whisper.Whisper = await whisper.create({
            label: 'Testing Complete',
            onClose: () => {
              console.log('');
            },
            components: [
              {
                body: `All tests for ${group.getId()} have been run`,
                type: whisper.WhisperComponentType.Markdown,
              },
            ],
          });
          setTimeout(() => {
            form.close((error) => console.error(error));
          }, 5000);
        });
      },
      text: `---${group.getId()}`,
      style: whisper.Urgency.None,
    });
    allTests = allTests.concat(testConfig[keys[i]].getTests());
  }

  clickableElements.push({
    type: whisper.WhisperComponentType.Link,
    textAlign: whisper.TextAlign.Left,
    onClick: () => {
      const suite = new TestSuite(allTests);

      suite.start().then(() => {
        console.info('🎉 Done!');
        let prompt: whisper.Whisper;
        whisper
          .create({
            label: 'Testing Complete',
            onClose: () => {
              console.log('');
            },
            components: [
              {
                body: 'All tests have been run',
                type: whisper.WhisperComponentType.Markdown,
              },
            ],
          })
          .then((whisperForm: whisper.Whisper) => {
            prompt = whisperForm;
          });
        setTimeout(() => {
          prompt.close((error) => console.error(error));
        }, 5000);
      });
    },
    text: 'Run All Tests',
    style: whisper.Urgency.None,
  });

  return whisper.create({
    label: 'Self Test Loop',
    onClose: () => {
      console.log('closed Self Test whisper');
    },
    components: clickableElements,
  });
};
