import { whisper } from '@oliveai/ldk'
import { Checkbox, ChildComponents, Components, Markdown, TextInput } from "@oliveai/ldk/dist/whisper";

const textInput: TextInput = {
    type: whisper.WhisperComponentType.TextInput,
    label: 'Text Input',
    tooltip: 'myTooltip',
    onChange: (error, value) => {
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

const markdown: Markdown = {
    type: whisper.WhisperComponentType.Markdown,
    body: '**Test Markdown**'
};

const checkbox: Checkbox = {
    type: whisper.WhisperComponentType.Checkbox,
    label: 'Checkbox',
    value: false,
    onChange: (error, value, whisper) => { console.info(`Checkbox OnChange: ${value}`) }
};

const confirmOrDeny = (
    resolve: (value: boolean | PromiseLike<boolean>) => void,
    reject: (reason?: any) => void,
    prompt: string,
    rejectReason?: any,
    incomingWhisper?: whisper.Whisper): Array<Components> => [
        {
            type: whisper.WhisperComponentType.Message,
            body: prompt
        },
        {
            type: whisper.WhisperComponentType.Box,
            alignment: whisper.Alignment.SpaceAround,
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
                        if (rejectReason) reject(new Error(rejectReason));
                        reject();
                    }
                }
            ],
        }
    ];

export const basicWhisperUpdate = (): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
        try {
            whisper.create({
                label: 'First Whisper',
                onClose: () => { },
                components: [
                    textInput,
                    markdown,
                    checkbox,
                    {
                        type: whisper.WhisperComponentType.Button,
                        label: 'Update',
                        onClick: (error, incomingWhisper) => {
                            if (error) {
                                incomingWhisper.close(error => { console.error(error) });
                                console.error(error);
                                reject(error);
                            }
                            incomingWhisper.update({
                                label: 'Update Whisper',
                                components: [
                                    textInput,
                                    markdown,
                                    checkbox,
                                    textInputTwo,
                                    ...confirmOrDeny(
                                        resolve,
                                        reject,
                                        'Did the TextInput update properly?',
                                        'TextInput failed to update',
                                        incomingWhisper)
                                ]
                            }, (error) => {
                                if (error) {
                                    console.error(error);
                                    incomingWhisper.close(error => console.error(error));
                                    reject(error);
                                }
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
                    collapseBox,
                    {
                        type: whisper.WhisperComponentType.Markdown,
                        body: 'Expand the collapse box and Update.'
                    },
                    {
                        type: whisper.WhisperComponentType.Button,
                        label: 'Update',
                        onClick: (error, incomingWhisper) => {
                            if (error) {
                                console.error(error);
                                reject(error);
                            }
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
                                if (error) {
                                    console.error(error);
                                    incomingWhisper.close(error => console.error(error));
                                    reject(error);
                                }
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

export const updateOnChange = (): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
        try {
            whisper.create({
                label: 'Update onChange events',
                onClose: () => { },
                components: [
                    {
                        type: whisper.WhisperComponentType.TextInput,
                        label: 'Enter 1',
                        onChange: (error, value, incomingWhisper) => {
                            if (value === '1') {
                                incomingWhisper.update({
                                    label: 'Whisper Updated',
                                    components: [
                                        {
                                            type: whisper.WhisperComponentType.TextInput,
                                            label: 'Enter 2',
                                            value: '',
                                            onChange: (error, value, incomingWhisper) => {
                                                if (value === '2') {
                                                    incomingWhisper.close(error => { console.error(error) });
                                                    resolve(true)
                                                } else {
                                                    incomingWhisper.close(error => { console.error(error) });
                                                    reject(new Error('User did not enter required value.'));
                                                }
                                            }
                                        }
                                    ]
                                }, (error) => {
                                    if (error) {
                                        console.error(error);
                                        incomingWhisper.close(error => console.error(error));
                                        reject(error);
                                    }
                                });
                            } else {
                                incomingWhisper.close(error => { console.error(error) });
                                reject(new Error('User did not enter required value.'));
                            }
                        }
                    }
                ]
            })
        } catch (error) {
            console.error(error);
            console.error(error.message);
        }
    });