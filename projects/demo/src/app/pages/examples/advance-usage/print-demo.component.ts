import { Component } from '@angular/core';
import { Ng2ScreenshotAPI } from 'ng2-screenshot';

@Component({
    selector: 'print-demo',
    template: `
        <nz-switch [(ngModel)]="isOpen" [nzCheckedChildren]="checkedTemplate"></nz-switch>
        <ng-template #checkedTemplate><i nz-icon nzType="scissor"></i></ng-template>
        <p></p>
        <ng2-screenshot
            [isOpen]="isOpen"
            (apiInitialized)="apiInitialized($event)"
            (isOpenChange)="isOpenChange($event)"
        >
            <ng2-screenshot-toolbox>
                <button nz-button nzType="primary" (click)="print()">Print</button>
            </ng2-screenshot-toolbox>
            <nz-card>
                <h1 nz-title>Screenshot Content</h1>
                <p>I understand that I am addressing a very sensitive topic;</p>
                <p>
                    I will probably offend many readers that will say that I am an insane troll and my views are
                    bullshit.
                </p>
                <p>Offending is not my objective</p>
                <p>but I stand by my opinions. Of course comments are here to for you to voice your opinion</p>
                <p>And yes this piece is biased by my past experiences, but that’s the value of it,</p>
                <p>sharing my experiences.</p>
            </nz-card>
        </ng2-screenshot>
    `
})
export class PrintDemoComponent {
    isOpen = false;
    api: Ng2ScreenshotAPI;
    isOpenChange($event: boolean) {
        this.isOpen = $event;
    }

    apiInitialized($event: Ng2ScreenshotAPI) {
        this.api = $event;
    }

    print() {
        this.api.toPng((dataUrl: string) => {
            let windowContent = '';
            windowContent += '';
            windowContent += '';
            windowContent += '';
            windowContent += '<img src="' + dataUrl + '">';
            windowContent += '';
            windowContent += '';

            const printWin = window.open('', '', 'width=' + 1000 + ',height=' + 1000);
            printWin.document.open();
            printWin.document.write(windowContent);

            printWin.document.addEventListener(
                'load',
                () => {
                    printWin.focus();
                    printWin.print();
                    printWin.document.close();
                    printWin.close();
                },
                true
            );
        });
    }
}
