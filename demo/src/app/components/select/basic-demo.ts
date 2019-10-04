import { Component } from '@angular/core';

@Component({
    selector: 'basic-demo',
    templateUrl: './basic-demo.html'
})
export class BasicComponent {
    public target: string = 'target1';
    public isOpen: boolean = false;
    public target1Options = {
        filename: 'target1.png',
        downloadText: 'Download me',
        cancelText: 'Close it!'
    };
}
