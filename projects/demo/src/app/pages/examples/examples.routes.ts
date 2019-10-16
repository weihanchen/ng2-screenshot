import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

import { ExamplesComponent } from './examples.component';
import { TargetElementComponent } from './target-element/target-element.component';
import { CustomToolboxTemplateComponent } from './custom-toolbox-template/custom-toolbox-template.component';
import { AdvanceUsageComponent } from './advance-usage/advance-usage.component';

export const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'target-element',
      },
      {
        path: 'target-element',
        component: TargetElementComponent,
      },
      {
        path: 'custom-toolbox-template',
        component: CustomToolboxTemplateComponent,
      },
      {
        path: 'advance-usage',
        component: AdvanceUsageComponent,
      },
    ],
  },
];
