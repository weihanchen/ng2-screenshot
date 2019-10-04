ng2-screenshot
===

Angular screenshot in directive for screen capture.


## Installation

```sh
$npm install ng2-screenshot
```

## Basic Usage

1. Import `ScreenshotModule` into the module that declares the component using ng2-screenshot:

```javascript
import { ScreenshotModule } from 'ng2-screenshot';
```

2. Add it to imports under @NgModule:

```javascript
@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    ScreenshotModule,
    ...
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
```

3. Add `screenshot` and `screenshot-toolbox` to your template

```html
 <ng2-screenshot [isOpen]="isOpen">
    <ng2-screenshot-toolbox> </ng2-screenshot-toolbox>
    <pre>
        This is content...
    </pre>
</ng2-screenshot>
```