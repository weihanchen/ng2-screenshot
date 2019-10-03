import { Component, ElementRef, Renderer } from '@angular/core';

/**
 * Custom template of screenshot toolbox, connent with screenshot
 */
@Component({
    selector: 'ng2-screenshot-toolbox',
    template: `
        <div class="screenshot-toolbox-custom" ng-transclude></div>
    `
})
export class ScreenshotToolboxComponent {
    constructor(el: ElementRef, renderer: Renderer) {
        const template = `<div class="screenshot-toolbox">${el.nativeElement.children().html()}</div>`;
        renderer.selectRootElement(template);
        el.nativeElement.remove();
    }
}
