ng2-screenshot
===

Angular screenshot in directive for screen capture.

## Installation

```sh
npm install ng2-screenshot
```

## Basic Usage

1. Import `Ng2ScreenshotModule` into the module that declares the component using ng2-screenshot:

```javascript
import { Ng2ScreenshotModule } from 'ng2-screenshot';
```

2. Add it to imports under @NgModule:

```javascript
@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    Ng2ScreenshotModule,
    ...
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
```

3. Add `ng2-screenshot` and `ng2-screenshot-toolbox` to your template, `basic.component.html`

```html
<div>
    <nz-switch [(ngModel)]="isOpen" [nzCheckedChildren]="checkedTemplate"></nz-switch>
    <ng-template #checkedTemplate><i nz-icon nzType="scissor"></i></ng-template>
    <p></p>
    <ng2-screenshot [isOpen]="isOpen" (isOpenChange)="isOpenChange($event)">
        <ng2-screenshot-toolbox></ng2-screenshot-toolbox>
        <nz-card >
            <p>I understand that I am addressing a very sensitive topic;</p>
            <p>I will probably offend many readers that will say that I am an insane troll and my views are bullshit.</p>
            <p>Offending is not my objective</p>
            <p>but I stand by my opinions. Of course comments are here to for you to voice your opinion</p>
            <p>And yes this piece is biased by my past experiences, but that’s the value of it,</p>
            <p>sharing my experiences.</p>
        </nz-card>
    </ng2-screenshot>
   
</div>
```

4. declare binding variable: `isOpen`、`isOpenChange($event: boolean)`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'basic-demo',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicDemoComponent {
  isOpen = false;

  isOpenChange($event: boolean) {
    this.isOpen = $event;
  }
}

```


## Issue

This component implement on angular 8.0, but not test on other version.