import { NetworkClient } from './networkClient';
import { Logger } from '../logging';

const logger = new Logger('integration-test-logger');

describe('NetworkHostClient', () => {
  let subject: NetworkClient;

  beforeAll(async () => {
    subject = new NetworkClient();
    const connInfo = {
      address: 'localhost:4770',
      serviceId: 1,
      network: 'tcp',
    };
    const session = {
      loopid: 'LOOP_ID',
      token: 'TOKEN',
    };

    await subject.connect(connInfo, session, logger);
  });

  describe('#httpRequest', () => {
    test('returns response details in the expected form', async () => {
      const request = {
        url: 'http://test.example.com',
        method: 'GET',
        body: '',
        headers: {
          Cookie: ['monster=true'],
        },
      };

      const response = await subject.httpRequest(request);

      expect(response).toMatchObject({
        statusCode: expect.any(Number),
        data: expect.any(Uint8Array),
        headers: expect.any(Object),
      });
    });
  });
});
