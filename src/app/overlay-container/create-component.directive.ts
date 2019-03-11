import {
  Directive, ComponentFactoryResolver, Input, SimpleChanges, ViewContainerRef,
  OnChanges, OnDestroy, OnInit
} from '@angular/core';

import { ComponentItemModel } from './entities';

@Directive({
  selector: '[create-component]'
})
export class CreateComponentDirective implements OnChanges, OnDestroy {
  constructor(el: ViewContainerRef, crf: ComponentFactoryResolver) {
    this.el = el;
    this.crf = crf;
  }

  ngOnChanges() {
    this.componentItem = this.componentItemModel.contentComponent;
    if (this.componentItem) {
      if (!this.componentRef) {
        const com = this.crf.resolveComponentFactory(this.componentItem.component);
        this.componentRef = this.el.createComponent(com);
      }

      Object.keys(this.componentItem.properties).forEach((property) => {
        this.componentRef.instance[property] = this.componentItem.properties[property];
      });
    }

    this.componentRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  // @Input('create-component') componentItem: ComponentItemModel;
  @Input('create-component') componentItemModel;


  private el: ViewContainerRef;
  private crf;
  private componentRef;
  componentItem;
}
