import { Component, OnInit, Input, ViewChild, SimpleChanges, HostListener, OnDestroy, Renderer2, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { OverlayEntityService } from './entity.service';
import { OverlayModel, OverlayConfig } from './entities';
import { OverlayAnimation, MaskAnimation } from './animation';

@Component({
  selector: 'app-overlay-container',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  animations: [OverlayAnimation,MaskAnimation],
})
export class OverlayComponent implements OnInit,OnDestroy {

  constructor(
    private entityService: OverlayEntityService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '-1');
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  @Input() overlayModel: OverlayModel;
  @Input() overlayConfig: OverlayConfig;

  @Input('data-context')
  get model() { return this.entityService.model; }
  set model(value) { this.entityService.model = value; }

  /**
   * As a input, to get/set configuration
   *
   * @memberof KpiViewComponent
   */
  @Input('config')
  get config() { return this.entityService.config; }
  set config(value) { this.entityService.config = value; }

  /**
   * As a input, to get/set CSS styles
   *
   * @memberof KpiViewComponent
   */
  @Input('style')
  get style() { return this.entityService.style; }
  set style(value) { this.entityService.style = value; }

  @ViewChild('overlay') overlayComp;

}
