import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as filesystemTests from '../tests/filesystem';

export const filesystemTestGroup = (): TestGroup =>
  new TestGroup('File Aptitude', [
    new LoopTest(
      'File Aptitude - Query File Directory',
      filesystemTests.testQueryingDirectory,
      10000,
      'Querying root directory to look for newly created "file.json"...',
    ),
    new LoopTest(
      'File Aptitude - Create and Delete File',
      filesystemTests.testWriteAndRemoveFile,
      10000,
      'Trying to create then delete "test.txt"',
    ),
    new LoopTest(
      'File Aptitude - Update and read a file',
      filesystemTests.testWriteAndReadFile,
      15000,
      'Trying to create, update, then read the text in "test.txt" before deleting',
    ),
    new LoopTest(
      'File Aptitude - Listen File',
      filesystemTests.testListenFile,
      10000,
      'Monitoring for file changes...',
    ),
    new LoopTest(
      'File Aptitude - Listen Dir',
      filesystemTests.testListenDir,
      10000,
      'Monitoring for dir change...',
    ),
    new LoopTest(
      'File Aptitude - Dir Exists',
      filesystemTests.testDirExists,
      10000,
      'Checking for directory existence...',
    ),
    new LoopTest(
      'File Aptitude - File Exists',
      filesystemTests.testFileExists,
      10000,
      'Checking for file existence...',
    ),
    new LoopTest(
      'File Aptitude - Open File',
      filesystemTests.testOpenFile,
      10000,
      'Attempting to open file...',
    ),
    new LoopTest(
      'File Aptitude - Open Directory',
      filesystemTests.testOpenDirectory,
      10000,
      'Attempting to open directory...',
    ),
    new LoopTest(
      'File Aptitude - Open File Does Not Exists',
      filesystemTests.testOpenFileDoesNotExist,
      10000,
      'Trying to open afile that does not exist',
    ),
  ]);
