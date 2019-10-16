import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2ScreenshotModule } from 'ng2-screenshot';

// antd components
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { SharedModule } from '../../shared/shared.module';
import { routes } from './examples.routes';

// example components
import { ExamplesComponent } from './examples.component';
import { TargetElementComponent } from './target-element/target-element.component';
import { CustomToolboxTemplateComponent } from './custom-toolbox-template/custom-toolbox-template.component';
import { AdvanceUsageComponent } from './advance-usage/advance-usage.component';
import { DownloadFullDemoComponent } from './advance-usage/download-full-demo.component';
import { PrintDemoComponent } from './advance-usage/print-demo.component';

const EXAMPLES_COMPONENTS = [
  TargetElementComponent,
  CustomToolboxTemplateComponent,
  AdvanceUsageComponent,
  DownloadFullDemoComponent,
  PrintDemoComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng2ScreenshotModule,
    SharedModule,
    NzIconModule,
    NzSwitchModule,
    NzCardModule,
    NzButtonModule
  ],
  entryComponents: [
  ],
  declarations: [
    ExamplesComponent,
    ...EXAMPLES_COMPONENTS,
  ],
})
export class ExamplesModule { }
