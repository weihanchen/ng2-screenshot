import { ToolboxOptions } from './screenshot.interface';
import { Injectable } from '@angular/core';
@Injectable()
class ToolboxDefaultOptions implements ToolboxOptions {
    filename: string = 'screenshot.png';
    cancelText: string = 'Cancel';
    downloadText: string = 'Download';
}

@Injectable()
class Colors {
    gray: string = '#898b89';
    lightGray: string = '#e6e3e3';
}

@Injectable()
class HightLevelZindex {
    top: number = 1;
    second: number = 0;
}

export { ToolboxDefaultOptions, Colors, HightLevelZindex };
