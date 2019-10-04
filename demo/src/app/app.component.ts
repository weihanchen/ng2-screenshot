import { Component, OnInit } from '@angular/core';

let gettingStarted = require('html-loader!markdown-loader!../getting-started.md');

@Component({
    selector: 'demo-app',
    template: `
        <main class="bd-pageheader">
            <div class="container">
                <h1>Test</h1>
                <p>Test</p>
                <a class="btn btn-primary" href="https://github.com/weihanchen/ng2-screenshot">View on GitHub</a>
            </div>
        </main>

        <div class="container">
            <section id="getting-started" [innerHtml]="gettingStarted"></section>

            <select-section class="col-md-12"></select-section>
        </div>

        <footer class="footer">
            <div class="container">
                <p class="text-muted text-center">
                    <a href="https://github.com/valor-software/ng2-select">ng2-select</a> is maintained by
                    <a href="https://github.com/valor-software">valor-software</a>.
                </p>
            </div>
        </footer>
    `
})
export class AppComponent implements OnInit {
    public gettingStarted: string = gettingStarted;
    public ngOnInit(): any {
        setTimeout(() => {
            if (typeof PR !== 'undefined') {
                // google code-prettify
                PR.prettyPrint();
            }
        }, 150);
    }
}
