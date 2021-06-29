import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as networkTests from '../tests/network';

export const networkTestGroup = (): TestGroup => new TestGroup('Network Aptitude', [
    new LoopTest(
      'Network Aptitude - HTTPS test',
      networkTests.networkHTTPS,
      5000,
      'Calling a public HTTPS API. Should succeed.',
    ),
    new LoopTest(
      'Network Aptitude - HTTP test',
      networkTests.networkHTTP,
      5000,
      'Calling a public HTTP API. Should fail',
    ),
    new LoopTest(
      'Network Aptitude - WebSocket test',
      networkTests.networkWebSocket,
      20000,
      'Sending/receiving data to websocket should pass.',
    ),
  ]);
