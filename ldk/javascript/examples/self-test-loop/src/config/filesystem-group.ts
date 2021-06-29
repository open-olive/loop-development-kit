import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as filesystemTests from '../tests/filesystem';

export const filesystemTestGroup = (): TestGroup =>
  new TestGroup('File Aptitude', [
    new LoopTest(
      'File Aptitude - Query File Directory',
      filesystemTests.queryDirectory,
      10000,
      'Querying root directory to look for newly created "file.json"...',
    ),
    new LoopTest(
      'File Aptitude - Create and Delete File',
      filesystemTests.createAndDeleteFile,
      10000,
      'Trying to create then delete "test.txt"',
    ),
    new LoopTest(
      'File Aptitude - Update and read a file',
      filesystemTests.updateAndReadFile,
      15000,
      'Trying to create, update, then read the text in "test.txt" before deleting',
    ),
    new LoopTest(
      'File Aptitude - Listen File',
      filesystemTests.listenFile,
      10000,
      'Monitoring for file changes...',
    ),
    new LoopTest(
      'File Aptitude - Listen Dir',
      filesystemTests.listenDir,
      10000,
      'Monitoring for dir change...',
    ),
    new LoopTest(
      'File Aptitude - Dir Exists',
      filesystemTests.dirExists,
      10000,
      'Checking for directory existence...',
    ),
    new LoopTest(
      'File Aptitude - File Exists',
      filesystemTests.fileExists,
      10000,
      'Checking for file existence...',
    ),
  ]);
