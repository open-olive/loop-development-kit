import moment from 'moment';

import { LoopSensors, Logger, Loop, serveLoop } from '../../../dist';
import {
  WhisperDisambiguationElements,
  WhisperListStyle,
  WhisperListAlign,
} from '../../../dist/loopClients/whisperSensor';

import { decodeRecall, Recall, RecallJSON } from './transform';

const logger = new Logger('olive-helps-node-example-whisper-disambiguation');

export interface RecallMap {
  [key: string]: Recall;
}

export interface Element {
  [key: string]: WhisperDisambiguationElements;
}

class ExampleLoop implements Loop {
  private _sensors: LoopSensors | undefined;

  start(sensors: LoopSensors): void {
    this._sensors = sensors;
    const now = moment();
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[${now
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYYMMDD')}+TO+${now
      .endOf('month')
      .format('YYYYMMDD')}]&limit=10`;

    logger.info('Emitting disambiguation whisper', url);

    this.sensors.network
      .httpRequest({
        url,
        method: 'GET',
        body: '',
      })
      .then((response) => {
        const { results: jsonResults } = JSON.parse(
          Buffer.from(response.data).toString('utf8'),
        );
        const itemList = {} as Element;
        const results = {} as RecallMap;

        jsonResults.forEach((resultItem: RecallJSON, index: number) => {
          itemList[resultItem.recall_number] = {
            label: `😝${resultItem.recalling_firm} (${resultItem.recall_initiation_date})`,
            order: index + 1,
            type: 'option',
          };

          results[resultItem.recall_number] = decodeRecall(resultItem);
        });

        this.sensors.whisper.disambiguationWhisper(
          {
            label: 'Latest FDA Food Recall',
            markdown: '',
            elements: itemList,
          },
          (error, input) => {
            if (input) {
              const recallItem: Recall = results[input.key];

              logger.info(
                `Emitting disambiguation whisper with the key ${input.key}`,
                JSON.stringify(recallItem),
                JSON.stringify({
                  align: WhisperListAlign.LEFT,
                  body: recallItem.Description,
                  header: recallItem.Firm,
                  order: 0,
                  style: WhisperListStyle.NONE,
                  type: 'message',
                }),
              );

              if (recallItem) {
                this.sensors.whisper.listWhisper({
                  label: 'Latest FDA Food Recall',
                  markdown: '',
                  elements: {
                    topMessage: {
                      align: WhisperListAlign.LEFT,
                      body: recallItem.Description,
                      header: recallItem.Firm,
                      order: 0,
                      style: WhisperListStyle.NONE,
                      type: 'message',
                    },
                    sectionDivider: {
                      order: 1,
                      type: 'divider',
                    },
                    reason: {
                      value: recallItem.Reason,
                      label: 'Reason',
                      order: 2,
                      type: 'pair',
                    },
                    distribution: {
                      value: recallItem.Distribution,
                      label: 'Distribution',
                      order: 3,
                      type: 'pair',
                    },
                    quantity: {
                      value: recallItem.Quantity,
                      label: 'Quantity',
                      order: 4,
                      type: 'pair',
                    },
                    codes: {
                      extra: true,
                      value: recallItem.Codes,
                      label: 'Codes',
                      order: 5,
                      type: 'pair',
                    },
                    id: {
                      extra: true,
                      value: recallItem.ID,
                      label: 'Recall number',
                      order: 6,
                      type: 'pair',
                    },
                    date: {
                      extra: true,
                      value: recallItem.Date,
                      label: 'Date initiated',
                      order: 7,
                      type: 'pair',
                    },
                    recallType: {
                      extra: true,
                      value: recallItem.RecallType,
                      label: 'Recall type',
                      order: 8,
                      type: 'pair',
                    },
                    type: {
                      extra: true,
                      value: recallItem.Type,
                      label: 'Product type',
                      order: 9,
                      type: 'pair',
                    },
                    classification: {
                      extra: true,
                      value: recallItem.Classification,
                      label: 'Classification',
                      order: 10,
                      type: 'pair',
                    },
                    address: {
                      extra: true,
                      value: `${recallItem.Address1} ${
                        recallItem.Address2 ? `${recallItem.Address2} ` : ''
                      }${recallItem.City}, ${recallItem.State} ${
                        recallItem.Zip
                      } ${recallItem.Country}`,
                      label: 'Company address',
                      order: 11,
                      type: 'pair',
                    },
                  },
                });
              } else {
                logger.info(`Could not find recall with the key ${input.key}`);
              }
            }
          },
        );
      })
      .catch((e) => {
        logger.error('Error using network sensor', 'error', e.toString());
      });
  }

  stop(): void {
    logger.info('Stopping');
    this._sensors = undefined;
    process.exit(0);
  }

  private get sensors(): LoopSensors {
    if (this._sensors == null) {
      throw new Error('Cannot Retrieve Sensors Before Set');
    }
    return this._sensors;
  }
}

const loop = new ExampleLoop();
serveLoop(loop);
