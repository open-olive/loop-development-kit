import { LoopSensors, Logger, Loop, serveLoop } from '../../../dist';
import {
  WhisperListStyle,
  WhisperListAlign,
} from '../../../dist/loopClients/whisperSensor';

const logger = new Logger('olive-helps-node-example-whisper-list');

class ExampleLoop implements Loop {
  private _sensors: LoopSensors | undefined;

  start(sensors: LoopSensors): void {
    this._sensors = sensors;
    logger.info('Emitting list whisper');
    try {
      this.sensors.whisper.listWhisper({
        label: 'MCMG Location',
        markdown: 'test',
        elements: {
          topMessage: {
            align: WhisperListAlign.LEFT,
            body:
              'This is what body copy looks like. Just a bit, don’t overdo it!',
            header: 'Hello World, I am a subitle',
            order: 0,
            style: WhisperListStyle.NONE,
            type: 'message',
          },
          successMessage: {
            align: WhisperListAlign.CENTER,
            body: 'It should be highlighted green.',
            header: 'This is an alert message!',
            order: 1,
            style: WhisperListStyle.SUCCESS,
            type: 'message',
          },
          sectionDivider: {
            order: 2,
            type: 'divider',
          },
          sectionTitle: {
            align: WhisperListAlign.CENTER,
            header: 'Let’s set the table',
            order: 0,
            style: WhisperListStyle.NONE,
            type: 'message',
          },
          name: {
            value: 'David Simon MD',
            label: 'Name',
            order: 2,
            type: 'pair',
          },
          shoeSize: {
            label: 'Shoe Size',
            order: 3,
            type: 'pair',
            value: '38',
          },
          birthDate: {
            label: 'Birth Date',
            order: 4,
            style: WhisperListStyle.WARN,
            type: 'pair',
            value: 'Feb 30th, 1999',
          },
          favoriteColor: {
            extra: true,
            label: 'FavoriteColor',
            order: 5,
            type: 'pair',
            value: 'Greige',
          },
          favoriteAnimal: {
            extra: true,
            label: 'Dogs or Cats',
            order: 6,
            type: 'pair',
            value: 'Bats',
          },
          streetName: {
            extra: true,
            label: 'Street Name',
            order: 7,
            type: 'pair',
            value: 'Main Street',
          },
          zipCode: {
            extra: true,
            label: 'Zip Code',
            order: 8,
            type: 'pair',
            value: '10000',
          },
          city: {
            extra: true,
            label: 'City',
            order: 9,
            type: 'pair',
            value: 'Townsville',
          },
          phone: {
            extra: true,
            label: 'Phone',
            order: 10,
            type: 'pair',
            value: '123-456-7890',
          },
          favoriteCondiment: {
            extra: true,
            label: 'Favorite Condiment',
            order: 11,
            style: WhisperListStyle.WARN,
            type: 'pair',
            value: 'Pizza',
          },
          DashTime100Meter: {
            extra: true,
            label: '100m Dash Time',
            order: 12,
            type: 'pair',
            value: '4 minutes',
          },
          nickname: {
            extra: true,
            label: 'Nickname',
            order: 13,
            type: 'pair',
            value: 'Old Greg',
          },
          notes: {
            extra: true,
            label: 'Notes',
            order: 14,
            type: 'pair',
            value:
              'Lorem ipsum sit amet dolor why does this always feel like a decree by the ancient Romans? It’s just filler text.',
          },
          failureMessage: {
            align: WhisperListAlign.CENTER,
            body: 'It should be highlighted red.',
            extra: true,
            header: 'This is an alert message!',
            order: 15,
            style: WhisperListStyle.ERROR,
            type: 'message',
          },
        },
      });
    } catch (e) {
      logger.error('Error emitting list whisper', 'error', e.toString());
    }
  }

  stop(): void {
    logger.info('Stopping');
    this._sensors = undefined;
    process.exit(0);
  }

  private get sensors(): LoopSensors {
    if (this._sensors == null) {
      throw new Error('Cannot Retrieve Host Before Set');
    }
    return this._sensors;
  }
}

const loop = new ExampleLoop();
serveLoop(loop);
