import { Component, OnInit, Input, ViewChild, SimpleChanges, HostListener,
  OnDestroy, Renderer2, ElementRef, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { OverlayEntityService } from './entity.service';
import { OverlayModel, OverlayConfig } from './entities';
import { OverlayAnimation, MaskAnimation } from './animation';

import { BaseStyle } from '../styleConfig';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer,
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
  @HostBinding('style')
  get style() {
    /**
     * itmeMargin： 每一行margin
     * leftParmargin: 每一行lable部分margin
     * leftParMaxWid： 每一行lable部分最大宽度
     * rightParMaxWid： 每一行input部分最大宽度
     * increaseDisplay: 子group中表单是否要在一行显示。
     *                  flex: 一行显示;默认换行显示
     */
    return this.sanitizer.bypassSecurityTrustStyle(
      `
        ${BaseStyle.ItmeMargin}: 20px 50px 0 15px;
        ${BaseStyle.LeftParmargin}: 10px 50px 0 150px;
        ${BaseStyle.LeftParMaxWid}: 20%;
        ${BaseStyle.RightParMaxWid}: 75%;
        ${BaseStyle.IncreaseDisplay}: flex;
      `
    );
  }
  set style(value) { this.entityService.style = value; }

  @ViewChild('overlay') overlayComp;

}
