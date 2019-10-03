interface API {
    cancel(): void;
    download(): void;
    downloadFull(): void;
    toPng(callback: (url: string) => void): Promise<string>;
}

interface Rect {
    startX: number;
    startY: number;
    w: number;
    h: number;
}

interface ToolboxOptions {
    filename: string;
    cancelText: string;
    downloadText: string;
}

interface ToolboxPosition {
    left: number;
    top: number;
}

export { API, Rect, ToolboxOptions, ToolboxPosition };
