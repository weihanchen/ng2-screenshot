import { Component } from '@angular/core';
import { Ng2ScreenshotAPI } from 'ng2-screenshot';

@Component({
    selector: 'custom-toolbox-template-demo',
    templateUrl: './custom-toolbox-template.component.html',
    styleUrls: ['./custom-toolbox-template.component.scss']
})
export class CustomToolboxTemplateComponent {
    isOpen = false;
    api: Ng2ScreenshotAPI;
    snippets = {
        moduleRequire: require('raw-loader!../snippets/module-require.md'),
        APIRequire: require('raw-loader!../snippets/api-require.md'),
        customToolboxTemplate: require('raw-loader!../snippets/custom-toolbox-template.md')
      };
    isOpenChange($event: boolean) {
        this.isOpen = $event;
    }

    apiInitialized($event: Ng2ScreenshotAPI) {
        this.api = $event;
    }

    cancel() {
        this.api.cancel();
    }

    download() {
        this.api.download();
    }
}
