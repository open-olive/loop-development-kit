import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as networkTests from '../tests/network';

export const networkTestGroup = (): TestGroup =>
  new TestGroup('Network Aptitude', [
    new LoopTest(
      'Network Aptitude - HTTPS test',
      networkTests.testSecuredHttpRequest,
      5000,
      'Calling a public HTTPS API. Should succeed.',
    ),
    new LoopTest(
      'Network Aptitude - HTTP test',
      networkTests.testUnsecuredHttpRequest,
      5000,
      'Calling a public HTTP API. Should fail',
    ),
    new LoopTest(
      'Network Aptitude - Timeout test',
      networkTests.testHttpRequestTimeout,
      5000,
      'Custom timeout should pass',
    ),
    new LoopTest(
      'Network Aptitude - HTTP block test',
      networkTests.testHttpRequestBlock,
      5000,
      'HTTP call should not block',
    ),
    new LoopTest(
      'Network Aptitude - WebSocket test',
      networkTests.testWebsocketConnection,
      20000,
      'Sending/receiving data to websocket should pass.',
    ),
  ]);
