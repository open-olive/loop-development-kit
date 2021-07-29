import { WhisperComponentType, TextInput } from './types';
import { mapToInternalChildComponent } from './mapper';

describe('mapper', () => {
  describe('mapToInternalChildComponent', () => {
    it('updates stateMap upon change', async () => {
      const textInputId = 'myTextInput';
      const textInputComponent: TextInput = {
        type: WhisperComponentType.TextInput,
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
      const textInputComponent: TextInput = {
        type: WhisperComponentType.TextInput,
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

      expect(stateMap.get(textInputId)).toBeUndefined();
    });

    it('forwards calls to provided onChange after updating component state', () => {
      const textInputId = 'myTextInput';
      const textInputOnChange = jest.fn();

      const textInputComponent: TextInput = {
        type: WhisperComponentType.TextInput,
        label: 'myTextInput',
        id: textInputId,
        onChange: textInputOnChange,
      };

      const stateMap = new Map();
      const mappedComponent = mapToInternalChildComponent(textInputComponent, stateMap);

      const expectedOnChangeValue = 'myNewValue';
      const expectedError = undefined;
      const expectedWhisper = {
        id: '',
        close: jest.fn(),
        componentState: stateMap,
        update: expect.any(Function),
      };
      (mappedComponent as OliveHelps.TextInput).onChange(
        expectedError,
        expectedOnChangeValue,
        expectedWhisper,
      );

      expect(textInputOnChange).toHaveBeenCalledWith(
        expectedError,
        expectedOnChangeValue,
        expectedWhisper,
      );
    });
  });
});
