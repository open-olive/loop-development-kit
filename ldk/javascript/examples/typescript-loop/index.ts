import { clipboard, whisper } from '@oliveai/ldk';

  const clipboardListenAndWhisper = () => {
      // clipboard.listen(true, (incomingText: string) => {
      //     whisper.create({
      //       label: 'Clipboard Text Whisper',
      //       onClose: () => {
      //         console.log("Closed Clipboard Text Whisper");
      //       },
      //       components: [
      //         {
      //           body: `Got Clipboard Text: ${incomingText}`,
      //           type: whisper.WhisperComponentType.Markdown,
      //         },
      //       ]
      //     });
      // });

      const form = {
        children: [
          {
            label: `What can't you explain?`,
            onChange: (error: any, value: any) => {},
            tooltip: 'Stonks?',
            value: '',
            name: 'myTextInput',
            type: whisper.WhisperComponentType.TextInput,
          },
          {
            label: 'My Email Input',
            onChange: (error: any, value: any) => {},
            name: 'myEmailInput',
            type: whisper.WhisperComponentType.Email
          },
          {
            onSelect: (error: any, value: any) => {},
            options: ['red', 'blue'],
            name: 'myRadioGroup',
            type: whisper.WhisperComponentType.RadioGroup
          }
        ],
        onSubmit: (values: Map<string, any>) => {
          console.info("Got component state!");
          values.forEach((value: any, key: string) => console.info(key, value));
        },
        type: whisper.WhisperComponentType.Form
      };
  
      const config = {
        label: 'Form Whisper',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          form,
        ]
      };
      whisper.create(config);
  }
  
  clipboardListenAndWhisper();