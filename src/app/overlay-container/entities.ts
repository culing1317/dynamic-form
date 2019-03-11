import { TemplateRef, ComponentRef } from "@angular/core";
import { Observable } from "rxjs";

// Define Config type
export interface OverlayConfig {
  type: string,
  beforeTrigger$?: Observable<any>
}

export enum OverlayType {
  template = 'template',
  component = 'component'
}

// Define Model type
export interface OverlayModel {
  parentTemplate?: TemplateRef<any>,
  contentTemplate?: TemplateRef<any>,
  contentContext?: object,
  contentComponent?: ComponentItemModel;
}


// Define Style type
export interface OverlayStyle {
}

export interface OverlayRef {
  contentComponent?: ComponentRef<any>,
  contentTemplate?: TemplateRef<any>,
  show: () => {},
  hide: () => {}
}

export interface TemplateItemModel {
  contentTemplate: TemplateRef<any>,
  contentContext?: object,
}

export interface ComponentItemModel {
  component: any;
  properties: {};
}
