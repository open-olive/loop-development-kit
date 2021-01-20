import moment from 'moment';
import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import {
  StoppableStream,
  StreamListener,
} from '../../../dist/hostClients/stoppables';
import {
  WhisperListStyle,
  WhisperListAlign,
  WhisperFormSubmitEvent,
} from '../../../dist/hostClients/whisperService';

const logger = new Logger('olive-helps-node-example-clipboard');

class ClipboardLoop implements Loop {
  private _host: HostServices | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  private formSubmissionStream:
    | StreamListener<WhisperFormSubmitEvent>
    | undefined;

  start(host: HostServices): void {
    this._host = host;

    logger.info('Requesting Stream');

    try {
      this.host.clipboard.streamClipboard((error, response) => {
        logger.info(
          'Food recall event started',
          'response',
          JSON.stringify(response),
        );
        if (response) {
          this.host.whisper.formWhisper(
            {
              submitButton: 'Submit',
              cancelButton: 'Cancel',
              label: 'Form Whisper',
              markdown: '',
              inputs: {
                startDate: {
                  type: 'text',
                  value: '',
                  label: 'Start Date',
                  tooltip: 'YYYY-MM-DD',
                  order: 1,
                },
                endDate: {
                  type: 'text',
                  value: '',
                  label: 'End Date',
                  tooltip: 'YYYY-MM-DD',
                  order: 2,
                },
              },
            },
            (e, input) => {
              if (e !== null) {
                logger.error('Error in FDA form submit', e);
              }

              if (typeof input !== 'undefined') {
                const submitEvent = input as WhisperFormSubmitEvent;

                this.makeNetworkCall();

                /* logger.info(
                  'FDA input keys',
                  Object.keys(submitEvent).toString(),
                );

                if (typeof submitEvent.outputs === 'undefined') {
                  logger.info('FDA outputs do not exist');
                  return;
                }

                logger.info(
                  'FDA Keys',
                  Object.keys(submitEvent.outputs).toString(),
                ); */
              }
            },
          );
        }
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
  }

  makeNetworkCall(): void {
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[${moment()
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYYMMDD')}+TO+${moment()
      .endOf('month')
      .format('YYYYMMDD')}]&limit=1`;

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
  }

  stop(): void {
    logger.info('Stopping');
    this.clipboardStream?.stop();
    this.clipboardStream = undefined;
    this._host = undefined;
    process.exit(0);
  }

  private get host(): HostServices {
    if (this._host == null) {
      throw new Error('Cannot Retrieve Host Before Set');
    }
    return this._host;
  }
}

const loop = new ClipboardLoop();
serveLoop(loop);
