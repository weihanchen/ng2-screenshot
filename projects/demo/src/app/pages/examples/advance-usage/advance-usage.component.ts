import { Component } from '@angular/core';
import { Ng2ScreenshotAPI } from 'ng2-screenshot';

@Component({
    selector: 'advance-usage-demo',
    templateUrl: './advance-usage.component.html',
})
export class AdvanceUsageComponent {
    snippets = {
        downloadFull: require('raw-loader!../snippets/download-full.md'),
        print: require('raw-loader!../snippets/print.md'),
    };
}
