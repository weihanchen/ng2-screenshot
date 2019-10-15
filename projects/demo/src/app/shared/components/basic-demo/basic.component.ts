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
