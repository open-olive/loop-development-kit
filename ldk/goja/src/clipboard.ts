export interface Clipboard {
    read(): Promise<string>;
    write(val: string): Promise<void>;
    listen(cb: (val: string) => void): void;
}

export class ClipboardImpl implements Clipboard {
    listen(cb: (val: string) => void): void {
    }

    read(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                oliveHelps.clipboard.read((val: string) => resolve(val));
            } catch (e) {
                reject(e);
                // TODO: add console log
            }
        });
    }
    

    write(val: string): Promise<void> {
        return Promise.resolve(undefined);
    }
    
}
