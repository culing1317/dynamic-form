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
  formModels = [];
  dropDownFlagBoolen: any = {};
  @Input('model')
  get model() {
    return this._model;
  }
  set model(value) {
    this._model = value;
    this.formModels = [];
    const result =  this.createFormModel(this._model);
    this.formModels = result.models;
    this.form = result.form;
    console.log(this.form.value);
  }
  _model: Array<any>;
  mycontext = {
    $implicit: [
      'erin',
      'eric',
    ]
      // name: 'erin',
      // bad: 'eric',

  };
  constructor() { }

  ngOnInit() {

  }
  onSubmit() {
    console.log(this.form.value);
  }

  onDropDown(flagId) {
    if(this.dropDownFlagBoolen[flagId]) {
      this.dropDownFlagBoolen[flagId] = !this.dropDownFlagBoolen[flagId];
    } else {
      this.dropDownFlagBoolen[flagId] = !!flagId;
    }
  }

  onRadioChange(event, controlModel, form) {
    controlModel.handler$(form.value).subscribe(
      (value) => {
        console.log(value);
      }
    );
  }
  attributeDesciption(data): string {
    console.log(JSON.stringify(data));
    // return data.stringify;
    return JSON.stringify(data);
  }
  private createFormModel(formDataSet: ConfigFormData[]) {
    const map = {};
    const models = [];
    for (let index = 0; index < formDataSet.length; index++) {
      const formData = formDataSet[index];
      switch (formData.type) {
        case ControlType.input:
          {
            map[formData.id] = new FormControl(formData.value);
            const model = new InputLabelModel(formData);
            models.push(model);
          }
          break;
        case ControlType.radio:
        case ControlType.dropDown:
          {
            map[formData.id] = new FormControl(formData.value);
            const model = new SingleSelectModel(formData);
            models.push(model);
          }
          break;
        case ControlType.checkbox:
        case ControlType.colorPicker:
          {
            const subMap = {};
            for (const element of formData.enum) {
              const option = element as { id: string, name: string, value?: any };
              subMap[option.id] = new FormControl(option.value);
            }
            map[formData.id] = new FormGroup(subMap);
            const model = new MultiSelectModel(formData);
            models.push(model);
          }
          break;
        case ControlType.group:
          {
            const subRes = this.createFormModel(formData.child);
            const model = new GroupModel(formData);
            model.child = subRes.models;
            map[formData.id] = subRes.form;
            models.push(model);
          }
          break;
        default:
          break;
      }
    }
    return {
      form: new FormGroup(map),
      models: models
    };
  }
}


class BasicModel {
  constructor(config) {
    this.id = config.id;
    this.type = config.type;
    this.name = config.name;
    this.value = config.value;
    this.handler$ = config.handler$;
    this.style = config.style;
  }
  id: string;
  type: ControlType;
  name?: string;
  value?: any;
  handler$?: () => Observable<any>;
  style?: BasicStyleModel;
}
class SingleSelectModel extends BasicModel {
  constructor(config: ConfigFormData) {
    super(config);
    const options = [];
    for (const value of config.enum) {
      options.push({
        name: value,
        value: value
      });
    }
    this.options = options;
    this.selectedOption = config.value;
  }
  options: Array<{
    name: string,
    value: string,
  }>;
  selectedOption: string;
}
class MultiSelectModel extends BasicModel {
  constructor(config: ConfigFormData) {
    super(config);
    const options = [];
    for (const value of config.enum) {
      const option = value as { id: string, name?: string, value?: any };
      options.push({
        id: option.id,
        name: option.name,
        value: option.value,
      });
    }
    this.options = options;
  }
  options: Array<{
    id: string,
    name?: string,
    value: boolean,
  }>;
}
class InputLabelModel extends BasicModel {
  constructor(config: ConfigFormData) {
    super(config);
    this.placeholder = config.placeholder ? config.placeholder : '';
  }
  placeholder: string;
}

class GroupModel extends BasicModel {
  constructor(config: ConfigFormData) {
    super(config);
    this.child = config.child;
  }
  child: any[];
}
interface LabelModel {
  id: string;
  type: string;
}
export interface ConfigFormData {
  id: string;
  type: string;
  name: string;
  value?: any;
  validation?: string; // regex string
  handler$?: (data) => Observable<any>;
  enum?: { id: string, name?: string, value?: any }[] | string[];
  child?: ConfigFormData[];
  placeholder?: string;
}


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

interface Result {
  form: FormGroup;
  models: any[];
}
