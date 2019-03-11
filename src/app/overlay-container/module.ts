import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OverlayComponent } from './component';

import { OverlayService } from './component.service';
import { OverlayEntityService } from './entity.service';
import { CreateComponentDirective } from './create-component.directive';
import { CreateTemplateDirective } from './create-template.directive';

export * from './component.service';
export * from './component';
export * from './create-template.directive';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [OverlayComponent, CreateTemplateDirective, CreateComponentDirective],
  exports: [OverlayComponent, CreateTemplateDirective, CreateComponentDirective],
  providers: [OverlayEntityService],
  entryComponents: [OverlayComponent],
})
export class OverlayModule { }
