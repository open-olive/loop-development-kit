import moment from 'moment';

import { HostSensors, Logger, Loop, serveLoop } from '../../../dist';
import {
  WhisperListStyle,
  WhisperListAlign,
} from '../../../dist/hostClients/whisperSensor';

const logger = new Logger('olive-helps-node-example-network');

class ExampleLoop implements Loop {
  private _host: HostSensors | undefined;

  start(host: HostSensors): void {
    this._host = host;
    const now = moment();
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[${now
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYYMMDD')}+TO+${now
      .endOf('month')
      .format('YYYYMMDD')}]&limit=1`;

    logger.info('Emitting list whisper', url);

    try {
      this.host.network
        .httpRequest({
          url,
          method: 'GET',
          body: '',
        })
        .then((response) => {
          const { results } = JSON.parse(
            Buffer.from(response.data).toString('utf8'),
          );
          const [recallItem] = results;

          this.host.whisper.listWhisper({
            label: 'Latest FDA Food Recall',
            markdown: '',
            elements: {
              topMessage: {
                align: WhisperListAlign.LEFT,
                body: recallItem.product_description,
                header: recallItem.recalling_firm,
                order: 0,
                style: WhisperListStyle.NONE,
                type: 'message',
              },
              sectionDivider: {
                order: 1,
                type: 'divider',
              },
              reason: {
                value: recallItem.reason_for_recall,
                label: 'Reason',
                order: 2,
                type: 'pair',
              },
              distribution: {
                value: recallItem.distribution_pattern,
                label: 'Distribution',
                order: 3,
                type: 'pair',
              },
              quantity: {
                value: recallItem.product_quantity,
                label: 'Quantity',
                order: 4,
                type: 'pair',
              },
              codes: {
                extra: true,
                value: recallItem.code_info,
                label: 'Codes',
                order: 5,
                type: 'pair',
              },
              id: {
                extra: true,
                value: recallItem.recall_number,
                label: 'Recall number',
                order: 6,
                type: 'pair',
              },
              date: {
                extra: true,
                value: recallItem.recall_initiation_date,
                label: 'Date initiated',
                order: 7,
                type: 'pair',
              },
              recallType: {
                extra: true,
                value: recallItem.voluntary_mandated,
                label: 'Recall type',
                order: 8,
                type: 'pair',
              },
              type: {
                extra: true,
                value: recallItem.product_type,
                label: 'Product type',
                order: 9,
                type: 'pair',
              },
              classification: {
                extra: true,
                value: recallItem.classification,
                label: 'Classification',
                order: 10,
                type: 'pair',
              },
              address: {
                extra: true,
                value: `${recallItem.address_1} ${recallItem.address_2} ${recallItem.city}, ${recallItem.state} ${recallItem.postal_code} ${recallItem.country}`,
                label: 'Company address',
                order: 11,
                type: 'pair',
              },
            },
          });
        });
    } catch (e) {
      logger.error('Error using network sensor', 'error', e.toString());
    }
  }

  stop(): void {
    logger.info('Stopping');
    this._host = undefined;
    process.exit(0);
  }

  private get host(): HostSensors {
    if (this._host == null) {
      throw new Error('Cannot Retrieve Host Before Set');
    }
    return this._host;
  }
}

const loop = new ExampleLoop();
serveLoop(loop);
