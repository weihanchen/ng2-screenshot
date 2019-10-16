import { Component } from '@angular/core';
import { Ng2ScreenshotAPI } from 'ng2-screenshot';

@Component({
    selector: 'download-full-demo',
    template: `
        <nz-switch [(ngModel)]="isOpen" [nzCheckedChildren]="checkedTemplate"></nz-switch>
        <ng-template #checkedTemplate><i nz-icon nzType="scissor"></i></ng-template>
        <button nz-button nzType="primary" nzShape="circle" (click)="downloadFull()" *ngIf="isOpen">
            <i nz-icon nzType="download" nzTheme="outline"></i>
        </button>
        <p></p>
        <ng2-screenshot [isOpen]="isOpen" (apiInitialized)="apiInitialized($event)" (isOpenChange)="isOpenChange($event)">
            <ng2-screenshot-toolbox>
            </ng2-screenshot-toolbox>
            <nz-card>
                <h1 nz-title>Screenshot Content</h1>
                <p>I understand that I am addressing a very sensitive topic;</p>
                <p>I will probably offend many readers that will say that I am an insane troll and my views are bullshit.</p>
                <p>Offending is not my objective</p>
                <p>but I stand by my opinions. Of course comments are here to for you to voice your opinion</p>
                <p>And yes this piece is biased by my past experiences, but that’s the value of it,</p>
                <p>sharing my experiences.</p>
            </nz-card>
        </ng2-screenshot>
    `,
})
export class DownloadFullDemoComponent {
    isOpen = false;
    api: Ng2ScreenshotAPI;
    isOpenChange($event: boolean) {
        this.isOpen = $event;
    }

    apiInitialized($event: Ng2ScreenshotAPI) {
        this.api = $event;
    }

    downloadFull() {
        this.api.downloadFull();
    }
}
