import { Component, OnInit} from '@angular/core';
import { DynamicFormComponent,
         SingleSelectModel,
         MultiSelectModel,
         InputLabelModel,
         LabelModel,
         Direction } from './dynamic-form/dynamic-form.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  formModel: Array<any>;
  constructor() { }

  ngOnInit() {
    const inputModel: InputLabelModel = {
      id: 'dataSource',
      type: 'text',
      label: 'DataSources',
      placeholder: 'pls input here',
      value: 'initial text',
      handler: ((a, b) => {
        this.log(a, b);
      }),
      style: {
        fxLayout: Direction.row,
        fxLayoutGap: '20px',
        fxLayoutAlign: 'center center',
        height: '100px',
        margin: '20px 0 0 0'
      }
    };
    const singleModel: SingleSelectModel = {
      id: 'interval',
      type: 'radio',
      label: 'Interval',
      options: [
        {
          label: 'week',
          value: 'week',
        },
        {
          label: 'day',
          value: 'day',
        },
        {
          label: 'hour',
          value: 'hour',
        },
      ],
      selectedOption: 'hour',
      handler: ((a, b) => {
        this.log(a, b);
      })
    };
    const dropDownModel: SingleSelectModel = {
      id: 'dataTypes',
      type: 'dropDown',
      label: 'DataTypes',
      options: [
        {
          label: 'raw',
          value: 'raw',
        },
        {
          label: 'product-line',
          value: 'product-line',
        },
      ],
      selectedOption: '',
      handler: ((a, b) => {
        this.log(a, b);
      })
    };
    const multiModel: MultiSelectModel = {
      id: 'points',
      type: 'checkbox',
      label: 'Points',
      options: [
        {
          id: 'A1Current',
          value: 'A1Current',
          checked: true
        },
        {
          id: 'A2Current',
          value: 'A2Current',
          checked: true,
        },
        {
          id: 'A3Current',
          value: 'A3Current',
          checked: false,
        }
      ],
      handler: ((a, b) => {
        this.log(a, b);
      })
    };
    const colorPickerModel: MultiSelectModel = {
      id: 'pointcolor',
      type: 'colorPicker',
      label: 'Points Colors',
      options: [
        {
          id: 'A1Current',
          label: 'A1Current',
          value: '#ff0000',
          checked: true
        },
        {
          id: 'A2Current',
          label: 'A2Current',
          value: '#00ff00',
          checked: true,
        },
        {
          id: 'A3Current',
          label: 'A3Current',
          value: '#0000ff',
          checked: false,
        }
      ],
      handler: ((a, b) => {
        this.log(a, b);
      })
    };
    this.formModel = [inputModel, dropDownModel, multiModel, colorPickerModel, singleModel];
  }

  log(message, b) {
    console.log(message, b);
  }

}
