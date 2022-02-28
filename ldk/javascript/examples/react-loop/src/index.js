import * as React from 'react';
import '@oliveai/ldk';
import * as ReactWhisper from '@oliveai/ldk/dist/whisper/react/renderer';
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
  Urgency,
  MarkdownWhisperCopyMode,
  MessageWhisperCopyMode,
  OpenDirection,
  ProgressShape,
  StyleSize,
  TextAlign,
  WidthSize,
} from '@oliveai/ldk/dist/whisper/types';

const ComponentHotTub = () => {
  const [radioValue, setRadioValue] = React.useState(0);
  const externalLink = 'https://www.google.com/';
  const options = [
    {
      label: 'Bananas Dogs Starbucks Ballerina',
      value: 'optionone'
    },
    {
      label: 'Pineapples Dinosaur Jamba Juice Mango',
      value: 'optiontwo'
    },
    {
      label: 'Dragon Fruit Oatmeal Chair Tread',
      value: 'optionthree'
    },
    {
      label: 'Apples Bottle Green Frame',
      value: 'optionfour'
    }
  ];

  const selectOptions = [
    "Option One",
    "Option Two",
    "Option Three",
  ];

  const onEvent = (error, value) => {
    console.log(`React Test Loop: ${value}${error ? `, ${error}` : ''}`)
  };

  return (
    <oh-whisper
      label="React"
      close={() => {
        console.log('oh-whisper close');
      }}
      onClose={() => {
        console.log('oh-whisper onClose');
      }}
    >
      <oh-pagination
        component="pagination"
        count={5}
        page={1}
        rowsPerPage={1}
        rowsPerPageOptions={[10]}
        onChange={(error, value) => console.log(value)}
        onRowsPerPageChange={() => undefined}
      />
      <oh-autocomplete
        freeSolo={false}
        label="Autocomplete"
        loading={false}
        multiple={false}
        onChange={(error, value) => onEvent(error, value)}
        onSelect={(error, value) => onEvent(error, value)}
        options={options}
        tooltip="Autocomplete Tooltip"
        validationError="Validation Error"
        value=""
      />
      <oh-autocomplete
        freeSolo={true}
        label="Autocomplete Freesolo"
        loading={false}
        multiple={false}
        onChange={(error, value) => onEvent(error, value)}
        onSelect={(error, value) => onEvent(error, value)}
        options={options}
        value=""
      />
      <oh-box
        direction={Direction.Vertical}
        justifyContent={JustifyContent.Left}
      >
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
          onChange={(error, value) => onEvent(error, value)}
          onSelect={(error, value) => onEvent(error, value)}
          options={options}
          value=""
        />
        <oh-autocomplete
          freeSolo={false}
          label="Autocomplete Multiple matchSorter"
          loading={false}
          matchSorter={{
            keys: ['label'],
            threshold: 'MATCHES',
          }}
          multiple={true}
          onChange={(error, value) => onEvent(error, value)}
          onSelect={(error, value) => onEvent(error, value)}
          options={options}
          value=""
        />
      </oh-box>
      <oh-box
        direction={Direction.Vertical}
        justifyContent={JustifyContent.Left}
        customHeight={CustomHeight.Small}
      >
        When a baby peperomia meets salami, there is often a dispute in who is the spiciest creature.
        Peperomia, the queen of the forest floor, will strike a pose upon first glance.
        Even a moment is enough to freeze the toughest taste buds in their tracks.
        When a baby peperomia meets salami, there is often a dispute in who is the spiciest creature.
        Peperomia, the queen of the forest floor, will strike a pose upon first glance.
        Even a moment is enough to freeze the toughest taste buds in their tracks.
        When a baby peperomia meets salami, there is often a dispute in who is the spiciest creature.
        Peperomia, the queen of the forest floor, will strike a pose upon first glance.
        Even a moment is enough to freeze the toughest taste buds in their tracks.
        When a baby peperomia meets salami, there is often a dispute in who is the spiciest creature.
        Peperomia, the queen of the forest floor, will strike a pose upon first glance.
        Even a moment is enough to freeze the toughest taste buds in their tracks.
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
          onClick={(error, value) => onEvent(error, value)}
          size={ButtonSize.Small}
          tooltip="Button Tooltip"
        />
        <oh-button
          buttonStyle={ButtonStyle.Secondary}
          disabled={false}
          label="Large"
          onClick={(error, value) => onEvent(error, value)}
          size={ButtonSize.Large}
        />
        <oh-button
          buttonStyle={ButtonStyle.Text}
          disabled={false}
          label="Small Text"
          onClick={(error, value) => onEvent(error, value)}
          size={ButtonSize.Small}
        />
        <oh-button
          buttonStyle={ButtonStyle.Text}
          disabled={false}
          label="Large Text"
          onClick={(error, value) => onEvent(error, value)}
          size={ButtonSize.Large}
        />
      </oh-box>
      <oh-box
        alignItems={AlignItems.Center}
        direction={Direction.Horizontal}
        justifyContent={JustifyContent.Center}
      >
        <oh-button
          buttonStyle={ButtonStyle.Primary}
          disabled={true}
          label="Small"
          onClick={(error, value) => onEvent(error, value)}
          size={ButtonSize.Small}
          tooltip="Disabled Button Tooltip"
        />
        <oh-button
          buttonStyle={ButtonStyle.Secondary}
          disabled={true}
          label="Large"
          onClick={(error, value) => onEvent(error, value)}
          size={ButtonSize.Large}
        />
        <oh-button
          buttonStyle={ButtonStyle.Text}
          disabled={true}
          label="Small Text"
          onClick={(error, value) => onEvent(error, value)}
          size={ButtonSize.Small}
        />
        <oh-button
          buttonStyle={ButtonStyle.Text}
          disabled={true}
          label="Large Text"
          onClick={(error, value) => onEvent(error, value)}
          size={ButtonSize.Large}
        />
      </oh-box>
      <oh-checkbox
        label="Checkbox One"
        onChange={(error, value) => onEvent(error, value)}
        tooltip="Checkbox Tooltip"
        validationError="Validation Error"
        value={false}
      />
      <oh-checkbox
        label="Checkbox Two"
        onChange={(error, value) => onEvent(error, value)}
        value={true}
      />
      <oh-checkbox
        onChange={(error, value) => onEvent(error, value)}
        value={true}
      />
      <oh-radio-group
        onSelect={(error, value) => {
          onEvent(error, value);

          setRadioValue(value);
        }}
        options={[
          "Radio One",
          "Radio Two",
          "Radio Three",
        ]}
        validationError="Bad Message"
        selected={radioValue}
      />
      <oh-collapse-box
        label="CollapseBox Top"
        onClick={(error, value) => onEvent(error, value)}
        open={false}
        openDirection={OpenDirection.Top}
        customHeight={CustomHeight.Small}
      >
        <oh-box
          direction={Direction.Vertical}
          justifyContent={JustifyContent.Left}
        >
          Nested Children
        </oh-box>
      </oh-collapse-box>
      <oh-collapse-box
        label="CollapseBox Bottom"
        onClick={(error, value) => onEvent(error, value)}
        open={true}
        openDirection={OpenDirection.Bottom}
      >
        Open by default When a baby peperomia meets salami, there is often a dispute in who is the spiciest creature.
        Peperomia, the queen of the forest floor, will strike a pose upon first glance.
        Even a moment is enough to freeze the toughest taste buds in their tracks.
        When a baby peperomia meets salami, there is often a dispute in who is the spiciest creature.
        Peperomia, the queen of the forest floor, will strike a pose upon first glance.
        Even a moment is enough to freeze the toughest taste buds in their tracks.
      </oh-collapse-box>
      <oh-divider />
      <oh-drop-zone
        accept={[
          'jpg',
          'jpeg',
          'png',
        ]}
        label="DropZone"
        limit={3}
        noun="Custom Noun"
        onDrop={(error, value) => onEvent(error, value)}
        onRemove={(error, value) => onEvent(error, value)}
        tooltip="DropZone Tooltip"
      />
      <oh-drop-zone
        label="DropZone Error Without Optional Fields"
        onDrop={(error, value) => onEvent(error, value)}
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
          onClick={(error, value) => onEvent(error, value)}
          size={IconSize.Small}
          tooltip="Icon Tooltip"
        />
        <oh-icon
          color={Color.Grey}
          name="touch_app"
          onClick={(error, value) => onEvent(error, value)}
          size={IconSize.Medium}
        />
        <oh-icon
          color={Color.White}
          name="task_alt"
          onClick={(error, value) => onEvent(error, value)}
          size={IconSize.Large}
        />
        <oh-icon
          color={Color.WhisperStrip}
          name="delete"
          onClick={(error, value) => onEvent(error, value)}
          size={IconSize.XLarge}
        />
      </oh-box>
      <oh-link
        href={externalLink}
        onClick={(error, value) => onEvent(error, value)}
        text="Link Left"
        textAlign={TextAlign.Left}
        tooltip="Link Tooltip"
      />
      <oh-link
        href={externalLink}
        onClick={(error, value) => onEvent(error, value)}
        style={Urgency.None}
        text="Link None Left"
        textAlign={TextAlign.Left}
      />
      <oh-link
        href={externalLink}
        onClick={(error, value) => onEvent(error, value)}
        style={Urgency.Error}
        text="Link Error Center"
        textAlign={TextAlign.Center}
      />
      <oh-link
        href={externalLink}
        onClick={(error, value) => onEvent(error, value)}
        style={Urgency.Success}
        text="Link Success Right"
        textAlign={TextAlign.Right}
      />
      <oh-link
        href={externalLink}
        onClick={(error, value) => onEvent(error, value)}
        style={Urgency.Warning}
        text="Link Warning"
      />
      <oh-list-pair
        copyable={false}
        labelCopyable={false}
        label="List Pair Label None Not Copyable"
        onCopy={(error, value) => onEvent(error, value)}
        style={Urgency.None}
        value="Value Error Copyable [Link](https://docs.oliveai.dev/whisper-components)"
      />
      <oh-list-pair
        copyable={true}
        labelCopyable={true}
        label="List Pair Label Error Copyable"
        onCopy={(error, value) => onEvent(error, value)}
        style={Urgency.Error}
        value="Value Error Copyable [Link](https://docs.oliveai.dev/whisper-components)"
      />
      <oh-list-pair
        copyable={true}
        labelCopyable={false}
        label="List Pair Label Success Not Copyable"
        onCopy={(error, value) => onEvent(error, value)}
        style={Urgency.Success}
        value="Value Success Copyable [Link](https://docs.oliveai.dev/whisper-components)"
      />
      <oh-list-pair
        copyable={false}
        labelCopyable={true}
        label="List Pair Label Warning Copyable"
        onCopy={(error, value) => onEvent(error, value)}
        style={Urgency.Warning}
        value="Value Warning Not Copyable [Link](https://docs.oliveai.dev/whisper-components)"
      />
      <oh-markdown
        body="# Markdown Header 1
        ## Markdown Header 2
        [Link](https://docs.oliveai.dev/whisper-components)"
        copyable={MarkdownWhisperCopyMode.Body}
        onCopy={(error, value) => onEvent(error, value)}
        onLinkClick={(error, value) => onEvent(error, value)}
        tooltip="Markdown Tooltip"
      />
      <oh-markdown
        body={`
          # Template Literal Markdown Header 1
          ## Template Literal Markdown Header 2
          [Link](https://docs.oliveai.dev/whisper-components)
        `}
        copyable={MarkdownWhisperCopyMode.Body}
        onCopy={(error, value) => onEvent(error, value)}
        onLinkClick={(error, value) => onEvent(error, value)}
      />
      <oh-message
        copyable={MessageWhisperCopyMode.Header}
        body="Message Accent [Link](https://docs.oliveai.dev/whisper-components)"
        header="Message Accent"
        onCopy={(error, value) => onEvent(error, value)}
        style={Color.Accent}
        tooltip="Message Accent Tooltip"
      />
      <oh-message
        copyable={MessageWhisperCopyMode.Header}
        body="Message Black [Link](https://docs.oliveai.dev/whisper-components)"
        header="Message Black"
        onCopy={(error, value) => onEvent(error, value)}
        style={Color.Black}
      />
      <oh-message
        copyable={MessageWhisperCopyMode.Body}
        body="Message Grey [Link](https://docs.oliveai.dev/whisper-components)"
        header="Message Grey"
        onCopy={(error, value) => onEvent(error, value)}
        style={Color.Grey}
      />
      <oh-message
        body="Message WhisperStrip [Link](https://docs.oliveai.dev/whisper-components)"
        header="Message WhisperStrip"
        onCopy={(error, value) => onEvent(error, value)}
        style={Color.WhisperStrip}
      />
      <oh-message
        body="Message None [Link](https://docs.oliveai.dev/whisper-components)"
        header="Message None"
        onCopy={(error, value) => onEvent(error, value)}
      />
      <oh-message
        body="Message Error Left [Link](https://docs.oliveai.dev/whisper-components)"
        header="Message Error Left"
        onCopy={(error, value) => onEvent(error, value)}
        style={Urgency.Error}
        textAlign={TextAlign.Left}
      />
      <oh-message
        body="Message Success Center [Link](https://docs.oliveai.dev/whisper-components)"
        header="Message Success Center"
        onCopy={(error, value) => onEvent(error, value)}
        style={Urgency.Success}
        textAlign={TextAlign.Center}
      />
      <oh-message
        body="Message Warning Right [Link](https://docs.oliveai.dev/whisper-components)"
        header="Message Warning Right"
        onCopy={(error, value) => onEvent(error, value)}
        style={Urgency.Warning}
        textAlign={TextAlign.Right}
      />
      <oh-box
        alignItems={AlignItems.Center}
        direction={Direction.Horizontal}
        justifyContent={JustifyContent.Center}
      >
        <oh-progress
          shape={ProgressShape.Circular}
          size={StyleSize.None}
        />
        <oh-progress
          determinate={20}
          shape={ProgressShape.Circular}
          size={StyleSize.None}
        />
        <oh-progress
          determinate={40}
          shape={ProgressShape.Circular}
          size={StyleSize.Small}
        />
        <oh-progress
          determinate={60}
          shape={ProgressShape.Circular}
          size={StyleSize.Medium}
        />
        <oh-progress
          determinate={80}
          shape={ProgressShape.Circular}
          size={StyleSize.Large}
        />
      </oh-box>
      <oh-progress
        shape={ProgressShape.Linear}
        size={StyleSize.None}
      />
      <oh-progress
        determinate={20}
        shape={ProgressShape.Linear}
        size={StyleSize.None}
      />
      <oh-rich-text-editor
        onBlur={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        tooltip="Rich Text Editor"
      />
      <oh-section-title
        body="Section Title None Left [Link](https://docs.oliveai.dev/whisper-components)"
        textAlign={TextAlign.Left}
      />
      <oh-section-title
        backgroundStyle={Color.Grey}
        body="Section Title Grey Center [Link](https://docs.oliveai.dev/whisper-components)"
        textAlign={TextAlign.Center}
      />
      <oh-section-title
        backgroundStyle={Color.White}
        body="Section Title White Right [Link](https://docs.oliveai.dev/whisper-components)"
        textAlign={TextAlign.Right}
      />
      <oh-select
        label="Select Label"
        loading={false}
        onChange={(error, value) => onEvent(error, value)}
        onSelect={(error, value) => onEvent(error, value)}
        options={selectOptions}
        tooltip="Select Tooltip"
        validationError=""
        value=""
      />
      <oh-select
        label="Select Label"
        loading={false}
        onChange={(error, value) => onEvent(error, value)}
        onSelect={(error, value) => onEvent(error, value)}
        options={selectOptions}
        tooltip="Select Tooltip"
        validationError="Validation Error"
        value=""
      />
      <oh-text-input
        label="Text Input"
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        tooltip="Text Tooltip"
        validationError="Validation Error"
        value=""
      />
      <oh-text-input
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        validationError=""
        value=""
      />
      <oh-number
        label="Number Input"
        max={200}
        min={-200}
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        step={20}
        validationError=""
        value={0}
      />
      <oh-number
        label="Number Input Free"
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        validationError=""
        value={0}
      />
      <oh-telephone
        label="Telephone Input"
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        validationError=""
        value=""
      />
      <oh-password
        label="Password Input"
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        validationError=""
        value=""
      />
      <oh-email
        label="Email Input"
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        validationError=""
        value=""
      />
      <oh-datetime
        dateTimeType={DateTimeType.Date}
        label="Date Input"
        max={new Date()}
        min={new Date(0)}
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        validationError=""
      />
      <oh-datetime
        dateTimeType={DateTimeType.DateTime}
        label="DateTime Input"
        max={new Date()}
        min={new Date(0)}
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        validationError=""
      />
      <oh-datetime
        dateTimeType={DateTimeType.Time}
        label="Time Input"
        max={new Date()}
        min={new Date(0)}
        onBlur={(error, value) => onEvent(error, value)}
        onFocus={(error, value) => onEvent(error, value)}
        onChange={(error, value) => onEvent(error, value)}
        validationError=""
      />
    </oh-whisper>
  );
};

ReactWhisper.renderNewWhisper(<ComponentHotTub/>);