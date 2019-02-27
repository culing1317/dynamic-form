import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { stringify } from '@angular/core/src/util';
import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  @Input('model')
  get model() {
    return this._model;
  }
  set model(value) {
    this._model = value;
    const map = {};
    for (const element of this.model) {
      switch (element.type) {
        case 'radio':
        case 'dropDown':
          {
            map[element.id] = new FormControl(element.selectedOption);
          }
          break;
        case 'text':
          {
            map[element.id] = new FormControl(element.value);
          }
          break;
        case 'checkbox':
          {
            const subMap = {};
            for (const iterator of element.options) {
              subMap[iterator.id] = new FormControl(iterator.checked);
            }
            map[element.id] = new FormGroup(subMap);
          }
          break;
        case 'colorPicker':
          {
            const subMap = {};
            for (const iterator of element.options) {
              subMap[iterator.id] = new FormControl(iterator.value);
            }
            map[element.id] = new FormGroup(subMap);
          }
          break;
        default:
          break;
      }
    }
    this.form = new FormGroup(map);
    console.log(this.form.value);
  }
  _model: Array<any>;
  constructor() { }

  ngOnInit() {

  }
  onSubmit() {
    console.log(this.form.value);
  }

  // onRadioChange(event, controlModel, form) {
  //   controlModel.handler$(form.value).subscribe(
  //     (value) => {
  //       form =
  //     }
  //   );
  // }
  attributeDesciption(data): string {
    console.log(JSON.stringify(data));
    // return data.stringify;
    return JSON.stringify(data);
  }
}

export interface SingleSelectModel extends BasicModel {
  options: Array<{
    label: string,
    value: string,
  }>;
  selectedOption: string;
}
export interface MultiSelectModel extends BasicModel {
  options: Array<{
    id: string,
    value: string,
    label?: string,
    checked: boolean,
  }>;
}
export interface InputLabelModel extends BasicModel {
  placeholder: string;
  value: string;
}
export interface LabelModel {
  id: string;
  type: string;
}
export interface BasicModel {
  id: string;
  type: string;
  label?: string;
  handler?: ((a, b) => void);
  style?: BasicStyleModel;
}

export interface ConfigFormData {
  id: string;
  type: string;
  name: string;
  default?: any;
  validation?: string; // regex string
  handler$?: () => Observable<any>;
  enum?: string[];
  child?: ConfigFormData[];
}

// function getFormModel(formDataSet: ConfigFormData[]) {
//   for (let index = 0; index < formDataSet.length; index++) {
//     const element = formDataSet[index];
//     switch () {
//       case value:

//         break;

//       default:
//         break;
//     }

//   }
// }

export interface BasicStyleModel {
  fxLayoutGap?: string;
  fxLayout?: Direction;
  fxLayoutAlign?: string;
  fxFlex?: boolean;
  width?: string;
  height?: string;
  color?: string;
  margin?: string;
}

export enum Direction {
  row = 'row',
  column = 'column',
}

export enum ControlType {
  group = 'group',
  input = 'input',
  radio = 'radio',
  dropDown = 'dropDown',
  checkbox = 'checkbox',
  colorPicker = 'colorPicker',
  table = 'table'
}

