import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenshotComponent } from './src/screenshot.component';
import { ScreenshotToolboxComponent } from './src/screenshot-toolbox.component';

export let providers: any[] = [];

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: providers
})
export class ScreenshotModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ScreenshotModule,
            providers: providers
        };
    }
}
