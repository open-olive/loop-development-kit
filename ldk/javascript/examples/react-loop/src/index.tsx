import { React, ReactWhisper } from '@oliveai/ldk';
// Display all enums rather than importing with * for better referencing as a test loop
import {
  AlignItems,
  ButtonSize,
  ButtonStyle,
  Color,
  CustomHeight,
  DateTimeType,
  Direction,
  IconSize,
  JustifyContent,
  MatchSorterRankings,
  MarkdownWhisperCopyMode,
  MessageWhisperCopyMode,
  OpenDirection,
  ProgressShape,
  StyleSize,
  TextAlign,
  Urgency,
} from '@oliveai/ldk/dist/whisper/types';

const ComponentHotTub: React.FunctionComponent<unknown> = () => {
  const externalLink = 'https://www.google.com/';
  const options = [
    {
      label: 'Bananas Dogs Starbucks Ballerina',
      value: 'optionone',
    },
    {
      label: 'Pineapples Dinosaur Jamba Juice Mango',
      value: 'optiontwo',
    },
    {
      label: 'Dragon Fruit Oatmeal Chair Tread',
      value: 'optionthree',
    },
    {
      label: 'Apples Bottle Green Frame',
      value: 'optionfour',
    },
  ];
  const selectOptions = ['Option One', 'Option Two', 'Option Three'];

  const onEvent = (error: Error, value?: any) => {
    console.log(`React Test Loop: ${value}${error ? `, ${error}` : ''}`);
  };

  return (
    <oh-whisper
      label="React"
      onClose={() => {
        console.log('oh-whisper onClose');
      }}
    >
      <oh-autocomplete
        freeSolo={false}
        label="Autocomplete"
        loading={false}
        multiple={false}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onSelect={(error: Error, value: any) => onEvent(error, value)}
        options={options}
        tooltip="Autocomplete"
        validationError="Validation Error"
        value=""
      />
      <oh-autocomplete
        freeSolo={true}
        label="Autocomplete Freesolo"
        loading={false}
        multiple={false}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onSelect={(error: Error, value: any) => onEvent(error, value)}
        options={options}
        value=""
      />
      <oh-box direction={Direction.Vertical} justifyContent={JustifyContent.Left}>
        <oh-autocomplete
          filterOptions={{
            ignoreAccents: true,
            ignoreCase: true,
            limit: 50,
            matchFrom: 'any',
            stringify: ['label', 'value'],
            trim: false,
          }}
          freeSolo={false}
          label="Autocomplete Freesolo filterOptions"
          loading={false}
          multiple={true}
          onChange={(error: Error, value: any) => onEvent(error, value)}
          onSelect={(error: Error, value: any) => onEvent(error, value)}
          options={options}
          value=""
        />
        <oh-autocomplete
          freeSolo={false}
          label="Autocomplete Multiple matchSorter"
          loading={false}
          matchSorter={{
            keys: ['label'],
            threshold: MatchSorterRankings.Matches,
          }}
          multiple={true}
          onChange={(error: Error, value: any) => onEvent(error, value)}
          onSelect={(error: Error, value: any) => onEvent(error, value)}
          options={options}
          value=""
        />
      </oh-box>
      <oh-box
        direction={Direction.Vertical}
        justifyContent={JustifyContent.Left}
        customHeight={CustomHeight.Small}
      >
        When a baby peperomia meets salami, there is often a dispute in who is the spiciest
        creature. Peperomia, the queen of the forest floor, will strike a pose upon first glance.
        Even a moment is enough to freeze the toughest taste buds in their tracks. When a baby
        peperomia meets salami, there is often a dispute in who is the spiciest creature. Peperomia,
        the queen of the forest floor, will strike a pose upon first glance. Even a moment is enough
        to freeze the toughest taste buds in their tracks. When a baby peperomia meets salami, there
        is often a dispute in who is the spiciest creature. Peperomia, the queen of the forest
        floor, will strike a pose upon first glance. Even a moment is enough to freeze the toughest
        taste buds in their tracks. When a baby peperomia meets salami, there is often a dispute in
        who is the spiciest creature. Peperomia, the queen of the forest floor, will strike a pose
        upon first glance. Even a moment is enough to freeze the toughest taste buds in their
        tracks.
      </oh-box>
      <oh-box
        alignItems={AlignItems.Center}
        direction={Direction.Horizontal}
        justifyContent={JustifyContent.Center}
      >
        <oh-button
          buttonStyle={ButtonStyle.Primary}
          disabled={false}
          label="Small"
          onClick={(error: Error, value: any) => onEvent(error, value)}
          size={ButtonSize.Small}
          tooltip="Small"
        />
        <oh-button
          buttonStyle={ButtonStyle.Secondary}
          disabled={false}
          label="Large"
          onClick={(error: Error, value: any) => onEvent(error, value)}
          size={ButtonSize.Large}
        />
        <oh-button
          buttonStyle={ButtonStyle.Text}
          disabled={false}
          label="Small Text"
          onClick={(error: Error, value: any) => onEvent(error, value)}
          size={ButtonSize.Small}
        />
        <oh-button
          buttonStyle={ButtonStyle.Text}
          disabled={false}
          label="Large Text"
          onClick={(error: Error, value: any) => onEvent(error, value)}
          size={ButtonSize.Large}
        />
      </oh-box>
      <oh-checkbox
        label="Checkbox One"
        onChange={(error: Error, value: any) => onEvent(error, value)}
        tooltip="Checkbox One"
        validationError="Validation Error"
        value={false}
      />
      <oh-checkbox
        label="Checkbox Two"
        onChange={(error: Error, value: any) => onEvent(error, value)}
        value={true}
      />
      <oh-checkbox
        label="Checkbox Three"
        onChange={(error: Error, value: any) => onEvent(error, value)}
        value={true}
      />
      <oh-radio-group
        onSelect={(error: Error, value: any) => onEvent(error, value)}
        options={['Radio One', 'Radio Two', 'Radio Three']}
        validationError="Validation Error"
        selected={0}
      />
      <oh-collapse-box
        label="CollapseBox Top"
        onClick={(error: Error, value: any) => onEvent(error, value)}
        open={false}
        openDirection={OpenDirection.Top}
      >
        When a baby peperomia meets salami, there is often a dispute in who is the spiciest
        creature. Peperomia, the queen of the forest floor, will strike a pose upon first glance.
        Even a moment is enough to freeze the toughest taste buds in their tracks. Salami, the
        terminator of all who read blues, constructs pillows of agony with every step. With the
        slightest reverberation, an iron clad tongue has but no chance to break towards freedom.
        What do you do?
      </oh-collapse-box>
      <oh-divider />
      <oh-drop-zone
        accept={['jpg', 'jpeg', 'png']}
        label="DropZone"
        limit={3}
        noun="Custom Noun"
        onDrop={(error: Error, value: any) => onEvent(error, value)}
        tooltip="DropZone Tooltip"
      />
      <oh-drop-zone
        label="DropZone Error Without Optional Fields "
        onDrop={(error: Error, value: any) => onEvent(error, value)}
        validationError="Validation Error"
      />
      <oh-box
        alignItems={AlignItems.Center}
        direction={Direction.Horizontal}
        justifyContent={JustifyContent.Center}
      >
        <oh-icon
          color={Color.Black}
          name="settings"
          onClick={(error: Error, value: any) => onEvent(error, value)}
          size={IconSize.Small}
          tooltip="Settings Icon"
        />
        <oh-icon
          color={Color.Grey}
          name="touch_app"
          onClick={(error: Error, value: any) => onEvent(error, value)}
          size={IconSize.Medium}
        />
        <oh-icon
          color={Color.White}
          name="task_alt"
          onClick={(error: Error, value: any) => onEvent(error, value)}
          size={IconSize.Large}
        />
        <oh-icon
          color={Color.WhisperStrip}
          name="delete"
          onClick={(error: Error, value: any) => onEvent(error, value)}
          size={IconSize.XLarge}
        />
      </oh-box>
      <oh-link
        href={externalLink}
        onClick={(error: Error, value: any) => onEvent(error, value)}
        text="Link Left"
        textAlign={TextAlign.Left}
      />
      <oh-link
        href={externalLink}
        onClick={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.None}
        text="Link None Left"
        textAlign={TextAlign.Left}
      />
      <oh-link
        href={externalLink}
        onClick={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Error}
        text="Link Error Center"
        textAlign={TextAlign.Center}
      />
      <oh-link
        href={externalLink}
        onClick={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Success}
        text="Link Success Right"
        textAlign={TextAlign.Right}
      />
      <oh-link
        href={externalLink}
        onClick={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Warning}
        text="Link Warning"
      />
      <oh-list-pair
        copyable={false}
        labelCopyable={false}
        label="Label None Not Copyable"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.None}
        value="Value Error Copyable"
      />
      <oh-list-pair
        copyable={true}
        labelCopyable={true}
        label="Label Error Copyable"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Error}
        value="Value Error Copyable"
      />
      <oh-list-pair
        copyable={true}
        labelCopyable={false}
        label="Label Success Not Copyable"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Success}
        value="Value Success Copyable"
      />
      <oh-list-pair
        copyable={false}
        labelCopyable={true}
        label="Label Warning Copyable"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Warning}
        value="Value Warning Not Copyable"
      />
      <oh-markdown
        body="# Markdown Header 1
        ## Markdown Header 2"
        copyable={MarkdownWhisperCopyMode.Body}
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        onLinkClick={(error: Error, value: any) => onEvent(error, value)}
        tooltip="Markdown Tooltip"
      />
      <oh-markdown
        body={`
        # Template Literal Markdown Header 1
        ## Template Literal Markdown Header 2
        `}
        copyable={MarkdownWhisperCopyMode.Body}
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        onLinkClick={(error: Error, value: any) => onEvent(error, value)}
      />
      <oh-message
        copyable={MessageWhisperCopyMode.Header}
        body="Message Accent"
        header="Message Accent"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Color.Accent}
        tooltip="Message Accent Tooltip"
      />
      <oh-message
        copyable={MessageWhisperCopyMode.Header}
        body="Message Black"
        header="Message Black"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Color.Black}
      />
      <oh-message
        copyable={MessageWhisperCopyMode.Body}
        body="Message Grey"
        header="Message Grey"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Color.Grey}
      />
      <oh-message
        body="Message None"
        header="Message None"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
      />
      <oh-message
        body="Message Error Left"
        header="Message Error Left"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Error}
        textAlign={TextAlign.Left}
      />
      <oh-message
        body="Message Success Center"
        header="Message Success Center"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Success}
        textAlign={TextAlign.Center}
      />
      <oh-message
        body="Message Warning Right"
        header="Message Warning Right"
        onCopy={(error: Error, value: any) => onEvent(error, value)}
        style={Urgency.Warning}
        textAlign={TextAlign.Right}
      />
      <oh-box
        alignItems={AlignItems.Center}
        direction={Direction.Horizontal}
        justifyContent={JustifyContent.Center}
      >
        <oh-progress shape={ProgressShape.Circular} size={StyleSize.None} />
        <oh-progress determinate={20} shape={ProgressShape.Circular} size={StyleSize.None} />
        <oh-progress determinate={40} shape={ProgressShape.Circular} size={StyleSize.Small} />
        <oh-progress determinate={60} shape={ProgressShape.Circular} size={StyleSize.Medium} />
        <oh-progress determinate={80} shape={ProgressShape.Circular} size={StyleSize.Large} />
      </oh-box>
      <oh-progress shape={ProgressShape.Linear} size={StyleSize.None} />
      <oh-progress determinate={20} shape={ProgressShape.Linear} size={StyleSize.None} />
      <oh-rich-text-editor
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Rich Text Editor"
      />
      <oh-section-title body="Section Title None Left" textAlign={TextAlign.Left} />
      <oh-section-title
        backgroundStyle={Color.Grey}
        body="Section Title Grey Center"
        textAlign={TextAlign.Center}
      />
      <oh-section-title
        backgroundStyle={Color.White}
        body="Section Title White Right"
        textAlign={TextAlign.Right}
      />
      <oh-select
        label="Select Label"
        onSelect={(error: Error, value: any) => onEvent(error, value)}
        options={selectOptions}
        tooltip="Select Tooltip"
        validationError="Validation Error"
      />
      <oh-text-input
        label="Text Input"
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Text Input"
        validationError="Validation Error"
        value=""
      />
      <oh-number
        label="Number Input"
        max={200}
        min={-200}
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        step={20}
        tooltip="Number Input"
        validationError=""
        value={0}
      />
      <oh-number
        label="Number Input Free"
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Number Input"
        validationError=""
        value={0}
      />
      <oh-telephone
        label="Telephone Input"
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Telephone Input"
        validationError=""
        value=""
      />
      <oh-password
        label="Password Input"
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Password Input"
        validationError=""
        value=""
      />
      <oh-email
        label="Email Input"
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Email Input"
        validationError=""
        value=""
      />
      <oh-datetime
        dateTimeType={DateTimeType.Date}
        label="Date Input"
        max={new Date()}
        min={new Date(0)}
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Date Input"
        validationError=""
      />
      <oh-datetime
        dateTimeType={DateTimeType.Date}
        label="Date Input"
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Date Input"
        validationError=""
      />
      <oh-datetime
        dateTimeType={DateTimeType.DateTime}
        label="DateTime Input"
        max={new Date()}
        min={new Date(0)}
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="DateTime Input"
        validationError=""
      />
      <oh-datetime
        dateTimeType={DateTimeType.Time}
        label="Time Input"
        max={new Date()}
        min={new Date(0)}
        onBlur={(error: Error) => onEvent(error)}
        onChange={(error: Error, value: any) => onEvent(error, value)}
        onFocus={(error: Error) => onEvent(error)}
        tooltip="Time Input"
        validationError=""
      />
    </oh-whisper>
  );
};

ReactWhisper.renderNewWhisper(<ComponentHotTub />);
