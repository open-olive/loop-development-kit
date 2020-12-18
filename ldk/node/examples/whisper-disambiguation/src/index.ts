
import moment from "moment";

import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import {
  WhisperDisambiguationElements,
  // WhisperDisambiguationOption,
} from '../../../dist/hostClients/whisperService';

import {RecallJSON} from './transform'

const logger = new Logger('olive-helps-node-example-network');

export interface Element {
  [key: string]: WhisperDisambiguationElements
}

class ExampleLoop implements Loop {
  private _host: HostServices | undefined;

  start(host: HostServices): void {
    this._host = host;
    const now = moment();
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[${now.subtract(3, 'months').startOf('month').format('YYYYMMDD')}+TO+${now.endOf("month").format('YYYYMMDD')}]&limit=10`;

    logger.info('Emitting disambiguation whisper', url);

    this.host.network.httpRequest({
      url,
      method: "GET",
      body: "",
    }).then((response) => {
      const { results } = JSON.parse(Buffer.from(response.data).toString('utf8'));
      const itemList = {} as Element;

      results.forEach((resultItem: RecallJSON, index: number) => {
        itemList[resultItem.recall_number] = {
          label: `😝${resultItem.recalling_firm} (${resultItem.recall_initiation_date}) jb`,
          order: index + 1,
          type: 'option',
        }
      })

      this.host.whisper.disambiguationWhisper({
        label: 'Latest FDA Food Recall',
        markdown: '',
        elements: itemList,
      },
      (error, input) => {
        if (input) {
          logger.info(`Zhu Li Do The Thing With ${input.key}`);
        }
      },
      );
    }).catch((e) => {
      logger.error('Error using network service', 'error', e.toString());
    })
  }

  stop(): void {
    logger.info('Stopping');
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

const loop = new ExampleLoop();
serveLoop(loop);