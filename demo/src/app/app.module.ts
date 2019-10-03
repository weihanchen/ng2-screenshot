import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, ButtonsModule } from 'ngx-bootstrap';

import { ScreenshotModule } from 'ng2-screenshot';
import { AppComponent } from './app.component';
import { SelectSectionComponent } from './components/select-section';
import { BasicComponent } from './components/select/basic-demo';
import { SampleSectionComponent } from './components/sample-section.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleSectionComponent,
    BasicComponent,
    SelectSectionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ScreenshotModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    CommonModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}