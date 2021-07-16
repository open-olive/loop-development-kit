import ldk from '@oliveai/ldk';
import { Box, Button, Markdown, Whisper } from '@oliveai/ldk/dist/components';
import {
  JustifyContent,
  Direction,
  ButtonStyle,
  ButtonSize,
} from '@oliveai/ldk/dist/whisper/types';

function clipboardListenAndWhisper() {
  return (
    <Whisper
      label="Clipboard Text Whisper"
      onClose={() => {
        console.log('Closed Clipboard Text Whisper');
      }}
    >
      <Markdown>
        this is a block of text from a markdown component1
      </Markdown>
      <Markdown>
        this is a block of text from a markdown component2
      </Markdown>
      <Box direction="horizontal" alignment="space-around">
        <Markdown>
          this is a block of text from a markdown component3
        </Markdown>
        <Markdown>
          this is a block of text from a markdown component4
        </Markdown>
      </Box>
      <Box direction={Direction.Horizontal} alignment={JustifyContent.SpaceEvenly}>
        <Button
          buttonStyle={ButtonStyle.Secondary}
          label="Don't click me"
          onClick={() => console.debug(`Why'd you do that?`)}
          size={ButtonSize.Large}
        />
        <Button
          buttonStyle={ButtonStyle.Text}
          label="Me neither"
          onClick={() => console.debug(`Why'd you do that?`)}
          size={ButtonSize.Small}
        />
        <Button
          label="Click me"
          onClick={(error, onClickWhisper) => {
            onClickWhisper.close((e) => console.error(e));
          }}
        />
      </Box>
    </Whisper>
  );
}

clipboardListenAndWhisper();
