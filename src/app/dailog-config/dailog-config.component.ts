import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { from, Subject } from 'rxjs';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
@Component({
  selector: 'app-dailog-config',
  templateUrl: './dailog-config.component.html',
  styleUrls: ['./dailog-config.component.css']
})
export class DailogConfigComponent implements OnInit {
  @ViewChild('form') formComponent: DynamicFormComponent;

  @Input('model')
  get model() {
    return this.formDataModel;
  }
  set model(value) {
    this.formDataModel = value;
  }
  cancel$: Subject<any>;
  confirm$: Subject<any>;
  formDataModel;
  constructor(
    ) {

   }

  ngOnInit() {
  }

}
