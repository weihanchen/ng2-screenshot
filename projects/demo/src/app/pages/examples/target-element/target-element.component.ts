import { Component } from '@angular/core';

@Component({
  selector: 'target-element-demo',
  templateUrl: './target-element.component.html',
  // styleUrls: ['./target-element.component.scss']
})

export class TargetElementComponent {
  isOpen = false;
  snippets = {
    moduleRequire: require('raw-loader!../snippets/module-require.md'),
    targetElementTemplate: require('raw-loader!../snippets/target-element-template.md')
  };

  isOpenChange($event: boolean) {
    this.isOpen = $event;
  }
}
