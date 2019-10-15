import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit,
    Inject,
} from '@angular/core';
import { ScreenshotComponent } from './screenshot.component';

/**
 * Custom template of screenshot toolbox, connent with screenshot
 */
@Component({
    selector: 'ng2-screenshot-toolbox',
    template: `
        <div class="screenshot-toolbox" [hidden]="!parent.showToolbox">
            <div #wrapper>
                <ng-content></ng-content>
            </div>
            <div *ngIf="!hasContent">
                <button class="btn" type="button" (click)="cancel()">
                    Cancel
                </button>
                <button class="btn" type="button" (click)="download()">
                    Download
                </button>
            </div>
        </div>
    `,
    styleUrls: ['./screenshot-toolbox.component.scss']
})
export class ScreenshotToolboxComponent implements AfterViewInit {
    @ViewChild('wrapper', { static: false }) wrapper: ElementRef;
    hasContent = false;
    constructor(@Inject(ScreenshotComponent) private parent: ScreenshotComponent) {
        // const template = `<div class="screenshot-toolbox">${el.nativeElement.children().html()}</div>`;
        // renderer.selectRootElement(template);
        // el.nativeElement.remove();
    }

    cancel() {
        this.parent.cancel();
    }

    download() {
        this.parent.download();
    }

    ngAfterViewInit() {
        this.hasContent = this.wrapper.nativeElement.children.length > 0;
    }
}
