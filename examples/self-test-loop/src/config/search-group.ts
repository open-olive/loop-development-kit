import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';
import * as searchTests from '../tests/search';

export const searchTestsGroup = (): TestGroup =>
  new TestGroup('Search Aptitude', [
    new LoopTest(
      'Search Aptitude - Create Index',
      searchTests.testSearchCreateIndex,
      10000,
      'test should pass automatically.',
    ),
    /*new LoopTest(
      'Search Aptitude - Create Index Search',
      searchTests.testSearchCreateIndexSearch,
      10000,
      'Can you see search result?',
    ),
    new LoopTest(
      'Search Aptitude - Create Index Query String Search',
      searchTests.testSearchCreateIndexQueryStringSearch,
      10000,
      'Can you see search result?',
    ),*/
  ]);
