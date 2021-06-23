import { whisper } from '..';
import { mapToInternalChildComponent } from './mapper';

describe('mapper', () => {
  describe('mapToInternalChildComponent', () => {
    it('updates stateMap upon change', async () => {
      const textInputId = 'myTextInput';
      const textInputComponent: whisper.TextInput = {
        type: whisper.WhisperComponentType.TextInput,
        id: textInputId,
        label: 'myTextInput',
        onChange: jest.fn(),
      };

      const stateMap = new Map();
      const mappedComponent = mapToInternalChildComponent(textInputComponent, stateMap);

      const expectedOnChangeValue = 'myNewValue';
      (mappedComponent as OliveHelps.TextInput).onChange(undefined, expectedOnChangeValue, {
        id: '',
        close: jest.fn(),
        update: jest.fn(),
      });

      expect(stateMap.get(textInputId)).toBe(expectedOnChangeValue);
    });

    it('does not update stateMap upon change given no component id', async () => {
      const textInputId = 'myTextInput';
      const textInputComponent: whisper.TextInput = {
        type: whisper.WhisperComponentType.TextInput,
        label: 'myTextInput',
        onChange: jest.fn(),
      };

      const stateMap = new Map();
      const mappedComponent = mapToInternalChildComponent(textInputComponent, stateMap);

      const expectedOnChangeValue = 'myNewValue';
      (mappedComponent as OliveHelps.TextInput).onChange(undefined, expectedOnChangeValue, {
        id: '',
        close: jest.fn(),
        update: jest.fn(),
      });

      expect(stateMap.get(textInputId)).toBeUndefined;
    });
  });
});
