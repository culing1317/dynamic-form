/**
 * Here implements the Angular Directive.
 *
 * [More descriptions for this component in multiple line]
 *
 * @flow
 *
 */
import {
  Directive, SimpleChanges, Input, Output, EventEmitter, ElementRef, Renderer2,
  OnInit, OnChanges, DoCheck, TemplateRef, ViewContainerRef, ContentChild, ComponentRef,
  AfterViewInit, AfterViewChecked, OnDestroy, HostListener, ViewChild
} from '@angular/core';

import { Observable } from 'rxjs';

import {
  OverlayEntityService,
  OverlayConfig,
} from './entity.service';
import { TemplateItemModel } from './entities';

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
@Directive({
  selector: '[create-template]',
})
export class CreateTemplateDirective
  implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    viewContainerRef: ViewContainerRef,
    entityService: OverlayEntityService
  ) {
    this.elementRef = elementRef;
    this.renderer = renderer;
    this.viewContainerRef = viewContainerRef;
    this.entityService = entityService;
    this.initialize();
  }

  //#region public lifecycle APIs, following the normal calling sequence
  ngOnInit() {
    console.debug('[OverlayDirective]ngOnInit');
    // To show overlay, it must change style: "position: relative; overflow: display" for host element
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.elementRef.nativeElement, 'overflow', 'visible');

    // Enable to trigger blur/focusout event when click on other element to let content disappear
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '-1');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('[CreateTemplateDirective]', changes);
    this.insert();
  }

  ngDoCheck() {
  }

  ngAfterViewInit() {
    this.debug('[OverlayDirective]ngAfterViewInit');
  }

  ngAfterViewChecked() {
    // this.debug('[OverlayDirective]ngAfterViewChecked');
  }

  ngOnDestroy() {
    this.debug('[OverlayDirective]ngOnDestroy');
  }
  //#endregion
  // #region public properties for data binding in html template

  // @Input('insert-template') contentTemplate: TemplateRef<any>;

  // @Input('insert-context') contentContext: object;

  // @Input('insert-before-trigger') beforeTrigger$: Observable<any>;

  // @Input('insert-option')
  // set popupOption(value: OverlayConfig) {
  //   this.config = value;
  // }

  //#endregion

  //#region private members
  //#region private event callbacks

  //#endregion

  private initialize() {
    this.windowViewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  private debug(msg) {
    // this.loger && this.loger.debug(msg);
  }

  private insert() {
    if (!this.config.beforeTrigger$) {
      this.appendTemplateContent();
      return;
    }
    this.config.beforeTrigger$.subscribe(
      () => {
        this.appendTemplateContent();
      }
    )
  }

  private appendTemplateContent() {
    // if (!this.config.triggerIf) { return; }
    const view = (<ViewContainerRef>this.viewContainerRef).createEmbeddedView(this.templateModel.contentTemplate, this.templateModel.contentContext);
    // must call this to set template content as child of host element
    view.rootNodes.forEach((element) => {
      // node is valid, change it's style
      this.renderer.appendChild(this.elementRef.nativeElement, element);
    });

  }

  @Input('create-template') templateModel: TemplateItemModel;

  private get config() { return this.entityService.config; }
  private set config(value) { this.entityService.config = value; }

  private get model() { return this.entityService.model; }
  private set model(value) { this.entityService.model = value; }

  private elementRef;
  private viewContainerRef;
  private renderer;

  private entityService;

  private windowViewport;
  //#endregion
}
