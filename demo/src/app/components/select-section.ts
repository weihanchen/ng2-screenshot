import { Component } from '@angular/core';

let doc = require('html-loader!markdown-loader!../../doc.md');

let tabDesc: any = {
  basic: {
    heading: 'Basic',
    ts: require('!!raw-loader?lang=typescript!./select/basic-demo.ts'),
    html: require('!!raw-loader?lang=markup!./select/basic-demo.html')
  }
};

@Component({
  selector: 'select-section',
  template: `
<section>
  <div class="row">
    <tabset>
      <tab heading="Basic">
        <sample-section [desc]="tabDesc.basic"><basic-demo></basic-demo></sample-section>
      </tab>
    </tabset>
  </div>
  <div class="row">
    <h2>API</h2>
    <div class="card card-block panel panel-default panel-body" [innerHTML]="doc"></div>
  </div>
</section>
  `
})
export class SelectSectionComponent {
  public currentHeading: string = 'Basic';
  public tabDesc: any = tabDesc;
  public doc: string = doc;
}