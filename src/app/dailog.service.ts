import { Injectable, Component, Injector, ApplicationRef, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DailogConfigComponent } from './dailog-config/dailog-config.component';
import { ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { OverlayService, OverlayRef } from './overlay-container/module';
@Injectable({
  providedIn: 'root'
})
export class DailogService {
  confirmDialogRef: OverlayRef;
  closeDialog: EventEmitter<any>;
  // okEvent$: (data) => Observable<any>;
  // cancelEvent$: () => Observable<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private overlayService: OverlayService,
    private appRef: ApplicationRef,
    private injector: Injector) {
     }

  open(formData) {
    this.closeDialog = new EventEmitter();
    const observable = Observable.create((observer) => {
      const overlayModel = {
        contentComponent: {
          component: DailogConfigComponent,
          properties: {
            model: formData,
            cancel$: this.cancel.bind(this),
            confirm$: this.confirm.bind(this)
          },
        }
      };
      this.confirmDialogRef = this.overlayService.create(overlayModel);
      this.confirmDialogRef.show();

      this.closeDialog.subscribe((res) => {
        observer.next(res);
      });
    });
    return observable;
  }

  cancel() {
    this.confirmDialogRef.hide();
    this.closeDialog.emit('cancel');

  }
  confirm(data) {
    this.confirmDialogRef.hide();
    this.closeDialog.emit(data);
  }
  private createComponent() {
    const component = this.componentFactoryResolver
      .resolveComponentFactory(DailogConfigComponent)
      .create(this.injector);
    return component;
  }

}
