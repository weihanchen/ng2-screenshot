@Component({
  template: `
    <nz-switch [(ngModel)]="isOpen" [nzCheckedChildren]="checkedTemplate"></nz-switch>
    <ng-template #checkedTemplate><i nz-icon nzType="scissor"></i></ng-template>
    <p></p>
    <ng2-screenshot [target]="'#target'" [isOpen]="isOpen" (apiInitialized)="apiInitialized($event)" (isOpenChange)="isOpenChange($event)">
        // custom toolbox template
        <ng2-screenshot-toolbox>
            <button nz-button nzType="default" (click)="cancel()">Cancel</button>
            <button nz-button nzType="primary" (click)="download()">Download</button>
        </ng2-screenshot-toolbox>
    </ng2-screenshot>

    <nz-card id="target">
        <h1 nz-title>Screenshot Content</h1>
        <p>I understand that I am addressing a very sensitive topic;</p>
        <p>I will probably offend many readers that will say that I am an insane troll and my views are bullshit.</p>
        <p>Offending is not my objective</p>
        <p>but I stand by my opinions. Of course comments are here to for you to voice your opinion</p>
        <p>And yes this piece is biased by my past experiences, but that’s the value of it,</p>
        <p>sharing my experiences.</p>
    </nz-card>
  `
})

export class TargetElementComponent {
    isOpen = false;
    api: Ng2ScreenshotAPI;
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
