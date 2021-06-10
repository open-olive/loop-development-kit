import { whisper } from '@oliveai/ldk'
import { ChildComponents, Components, TextInput } from "@oliveai/ldk/dist/whisper";

const textInput: TextInput = {
    type: whisper.WhisperComponentType.TextInput,
    label: 'Text Input',
    onChange: (error, value) => {
        // Tooltip is causing an issue. If 1 whisper has tooltip and the second doesn't.
        // Check index.ts inside desktop. The id prop for new whispers where tooltip does not match is problematic.
        // A fix for this is something like making ids more unique per component, however this will force React to re-render the entire component (losing focus and such.)
        console.info(`New Value for TextInput: ${value}`);
    }
};

const textInputTwo: TextInput = {
    type: whisper.WhisperComponentType.TextInput,
    label: 'Text Input Two',
    onChange: (error, value) => {
        console.info(`New Value for TextInput: ${value}`);
    }
};

const confirmOrDeny = (
    resolve: (value: boolean | PromiseLike<boolean>) => void,
    reject: (reason?: any) => void,
    prompt: string,
    rejectReason?: any,
    incomingWhisper?: whisper.Whisper): Array<Components> => [
        {
            type: whisper.WhisperComponentType.Markdown,
            body: prompt
        },
        {
            type: whisper.WhisperComponentType.Box,
            alignment: whisper.Alignment.SpaceEvenly,
            direction: whisper.Direction.Horizontal,
            children: [
                {
                    type: whisper.WhisperComponentType.Button,
                    label: 'Yes',
                    onClick: () => {
                        incomingWhisper?.close(error => { console.error(error) });
                        resolve(true);
                    }
                },
                {
                    type: whisper.WhisperComponentType.Button,
                    label: 'No',
                    onClick: () => {
                        incomingWhisper?.close(error => { console.error(error) });
                        if(rejectReason) reject(new Error(rejectReason));
                        reject();
                    }
                }
            ],
        }
    ];

export const updateTextInput = (): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
        try {
            whisper.create({
                label: 'First Whisper',
                onClose: () => { },
                components: [
                    textInput,
                    {
                        type: whisper.WhisperComponentType.Button,
                        label: 'Update',
                        onClick: (error, incomingWhisper) => {
                            incomingWhisper.update({
                                label: 'Update Whisper',
                                components: [
                                    textInputTwo,
                                    ...confirmOrDeny(
                                        resolve,
                                        reject,
                                        'Did the TextInput update properly?',
                                        'TextInput failed to update',
                                        incomingWhisper)
                                ]
                            });
                        }
                    }
                ],
            });
        } catch (error) {
            console.error(error);
            console.error(error.message);
        }
    });

export const updateNewState = (): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
        try {
        } catch (error) {
            console.error(error);
            console.error(error.message);
        }
    });

export const updateCollapseState = (): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
        try {
            const checkboxes: ChildComponents[] = [
                {
                    type: whisper.WhisperComponentType.Checkbox,
                    label: 'cb1',
                    value: false,
                    onChange: () => { }
                },
                {
                    type: whisper.WhisperComponentType.Checkbox,
                    label: 'cb2',
                    value: false,
                    onChange: () => { }
                }
            ]

            const collapseBox: Components = {
                type: whisper.WhisperComponentType.CollapseBox,
                children: [
                    ...checkboxes
                ],
                label: 'first CollapseBox',
                open: false
            };

            whisper.create({
                label: 'First Whisper',
                onClose: () => { },
                components: [
                    {
                        type: whisper.WhisperComponentType.Markdown,
                        body: 'Expand the collapse box and Update.'
                    },
                    collapseBox,
                    {
                        type: whisper.WhisperComponentType.Button,
                        label: 'Update',
                        onClick: (error, incomingWhisper) => {
                            incomingWhisper.update({
                                label: 'Update Whisper',
                                components: [
                                    collapseBox,
                                    ...confirmOrDeny(
                                        resolve,
                                        reject,
                                        'Did the second CollapseBox stay expanded?',
                                        'CollapseBox did not render properly after update',
                                        incomingWhisper
                                    ),
                                ]
                            }, (error) => {
                                console.error(error);
                                incomingWhisper.close(error => console.error(error));
                                reject(error);
                            });
                        },
                    }
                ]
            });
        } catch (error) {
            console.error(error);
            console.error(error.message);
        }
    });