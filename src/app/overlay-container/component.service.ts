/**
 * Here implements the Component Service
 *
 * [More descriptions for this component in multiple line]
 *
 * @flow
 *
 */
import { Injectable, EventEmitter, ViewContainerRef, Renderer2, ComponentRef, Injector, ApplicationRef, ElementRef, ComponentFactoryResolver, HostListener } from '@angular/core';

import {
  OverlayConfig,
  OverlayModel,
  OverlayStyle,
  OverlayRef,
  OverlayEntityService
} from './entity.service';

import { Observable } from 'rxjs';
import { OverlayComponent } from './component';

// re-exporting
export * from './entity.service';

/**
 * Following Code Convention
 * "member-ordering": [
 *   "constructor",
 *   "public-static-method",
 *   "public-static-field",
 *   "public-instance-method",
 *   "public-instance-field",
 *   "protected-static-method",
 *   "protected-static-field",
 *   "protected-instance-method",
 *   "protected-instance-field",
 *   "private-static-method",
 *   "private-static-field",
 *   "private-instance-method",
 *   "private-instance-field"
 * ]
 */
@Injectable()
export class OverlayService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private entityService: OverlayEntityService
  ) {
  }

  create(overlayModel: OverlayModel): OverlayRef {
    this.config.type = this.entityService.isWhatType(overlayModel);
    console.log('type', this.config.type);
    return this.createOverlay(overlayModel);
  }

  private initComponent(): ComponentRef<OverlayComponent> {
    const component = this.componentFactoryResolver
      .resolveComponentFactory(OverlayComponent)
      .create(this.injector);
    // component.changeDetectorRef.markForCheck();

    this.appRef.attachView(component.hostView);
    return component;
  }

  private createOverlay(overlayModel): OverlayRef {
    const component = this.initComponent();
    component.instance.overlayModel = overlayModel;
    const hostElement = (overlayModel.parentTemplate && overlayModel.parentTemplate.nativeElement) || this.elementRef.nativeElement.ownerDocument.querySelector('body');
    this.renderer.setStyle(hostElement, 'position', 'relative');

    const overlayRef = {
      show: this.showOverlay.bind(this, component, hostElement),
      hide: this.hideOverlay.bind(this, component),
    }
    return overlayRef;
  }

  private hideOverlay(component: ComponentRef<OverlayComponent>) {
    this.model.overlayState = 'closed';
    this.model.maskState = 'closed';

    // component.changeDetectorRef.detectChanges();

    setTimeout(() => {
      this.appRef.detachView(component.hostView);
      component.destroy();
    }, 100)

  }

  private showOverlay(component: ComponentRef<OverlayComponent>, hostElement) {
    this.model.overlayState = 'open';
    this.model.maskState = 'open';

    hostElement.appendChild((component.hostView as any).rootNodes[0]);
  }

  /**
   * Do initialization job, called by component class
   *
   * @memberof OverlayService
   */
  initialize() {
  }

  /**
   * Do memory collection
   *
   * @memberof OverlayService
   */
  dispose() {
    // store context data
    this.store();
  }

  /**
   * Do UI fresh
   *
   * @memberof OverlayService
   */
  refresh() {
    // this.myChart.resize();
  }

  /**
   * Do data peresistence job: saving
   *
   * @memberof OverlayService
   */
  store() {
  }

  /**
   * Do data peresistence job: restore
   *
   * @memberof OverlayService
   */
  restore() {
  }

  //#region private members

  // readonly private properties
  private get model() { return this.entityService.model; }
  private get style() { return this.entityService.style; }
  private get config() { return this.entityService.config; }

  //#endregion
}
