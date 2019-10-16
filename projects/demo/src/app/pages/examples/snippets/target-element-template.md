
@Component({
  template: `
    <!-- nz-switch is ng-zorro-antd's component -->
    <nz-switch [(ngModel)]="isOpen" [nzCheckedChildren]="checkedTemplate"></nz-switch>
    <!-- declare screenshot component and binding some variable-->
    <ng2-screenshot [target]="'#target'" [isOpen]="isOpen" (isOpenChange)="isOpenChange($event)">
        <ng2-screenshot-toolbox></ng2-screenshot-toolbox>
    </ng2-screenshot>
    <!-- this block is screenshot usage -->
     <div id="target">
        <h1 nz-title>This card component with id #target</h1>
        <p>I understand that I am addressing a very sensitive topic;</p>
        <p>I will probably offend many readers that will say that I am an insane troll and my views are bullshit.</p>
        <p>Offending is not my objective</p>
        <p>but I stand by my opinions. Of course comments are here to for you to voice your opinion</p>
        <p>And yes this piece is biased by my past experiences, but that’s the value of it,</p>
        <p>sharing my experiences.</p>
    </div>
  `
})

export class TargetElementComponent {
  isOpen = false;
  isOpenChange($event: boolean) {
    this.isOpen = $event;
  }
}
