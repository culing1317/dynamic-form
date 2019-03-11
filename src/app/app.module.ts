import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { OverlayModule } from './overlay-container/module';
import { DailogConfigComponent } from './dailog-config/dailog-config.component';
@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    DailogConfigComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDnDModule,
    OverlayModule
  ],
  entryComponents: [DailogConfigComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
