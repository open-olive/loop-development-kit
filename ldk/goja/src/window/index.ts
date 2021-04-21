export interface WindowInfo {
    title: string;
    path: string;
    pid: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface WindowEvent {
    info: WindowInfo;
    action: number;
}

export interface Window {
    /**
     * Get the currently focused window and it's data.
     * 
     * @returns A promise containing active window info.
     */    
    activeWindow(): Promise<WindowInfo>;

    /**
     * Receive notifications whenever the currently focused window changes.
     * 
     * @param callback A function called when active window changes.
     */
    listenActiveWindow(callback: (windowInfo: WindowInfo) => void): void;

    /**
     * Get a list of all the windows and their information.
     *  
     * @returns A promise containing all window info.
     */
    all(): Promise<WindowInfo[]>;

    /**
     * Receive a notification whenever a window is opened, closed, focused, unfocused, moved, resized, or its title changes. A window that is opened with focus will generate an Opened event and a Focused event.
     *  
     * @param callback A function called when any window changes.
     */
    listenAll(callback: (windowInfo: WindowInfo) => void): void;
}

export function activeWindow(): Promise<WindowInfo> {
    return new Promise<WindowInfo>((resolve, reject) => {
        try {
            oliveHelps.window.activeWindow((windowInfo: WindowInfo) => resolve(windowInfo));
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

export function listenActiveWindow(callback: (windowInfo: WindowInfo) => void): void {
    oliveHelps.window.listenActiveWindow(callback);
}

export function all(): Promise<WindowInfo[]> {
    return new Promise<WindowInfo[]>((resolve, reject) => {
        try {
            oliveHelps.window.all((windowInfos: WindowInfo[]) => resolve(windowInfos));
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

export function listenAll(callback: (windowInfo: WindowInfo) => void): void {
    oliveHelps.window.listenAll(callback);
}