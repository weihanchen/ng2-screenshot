import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScreenshotComponent } from './screenshot.component';
import { ScreenshotToolboxComponent } from './screenshot-toolbox.component';
import { Colors, HightLevelZindex, ToolboxDefaultOptions } from './screenshot.class';
import { DOMProcess } from './screenshot.utils';
@NgModule({
    imports: [CommonModule],
    declarations: [ScreenshotComponent, ScreenshotToolboxComponent],
    exports: [ScreenshotComponent, ScreenshotToolboxComponent],
    providers: [Colors, HightLevelZindex, ToolboxDefaultOptions, DOMProcess,  ScreenshotComponent]
})
export class ScreenshotModule {}
