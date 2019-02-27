import { Component, OnInit } from '@angular/core';
import {
  DynamicFormComponent,
  ConfigFormData,
  ControlType,
  Direction
} from './dynamic-form/dynamic-form.component';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  formDataModel: Array<ConfigFormData>;
  constructor() { }

  ngOnInit() {
    this.formDataModel = [
      {
        id: 'componentName',
        type: ControlType.input,
        name: 'componentName',
        value: 'initial text',
        placeholder: 'pls input here',
        handler$: (res: any) => {
          return Observable.create(observer => {
            const temp = res;
            observer.next(temp);
          });
        }
      },
      {
        id: 'dataSource',
        type: ControlType.dropDown,
        name: 'Data Sources',
        value: '',
        enum: ['MHOP50.1', 'MHOP50.3', 'MHOP50.4', 'MHOP50.5'],
        handler$: (res: any) => {
          return Observable.create(observer => {
            const temp = res;
            observer.next(temp);
          });
        }
      },
      {
        id: 'dataType',
        type: ControlType.dropDown,
        name: 'Data Types',
        value: '',
        enum: ['raw', 'product-line'],
        handler$: (res: any) => {
          return Observable.create(observer => {
            const temp = res;
            observer.next(temp);
          });
        }
      },
      {
        id: 'dataPoints',
        type: ControlType.checkbox,
        name: 'Data Points',
        value: '',
        enum: [{id: 'A1Current', name: 'A1Current', value: true},
               {id: 'A2Current', name: 'A2Current', value: false},
               {id: 'A3Current', name: 'A3Current', value: true},
               {id: 'A4Current', name: 'A4Current', value: false},
               {id: 'A5Current', name: 'A5Current', value: true}],
        handler$: (res: any) => {
          return Observable.create(observer => {
            const temp = res;
            observer.next(temp);
          });
        }
      },
      {
        id: 'PointsColor',
        type: ControlType.colorPicker,
        name: 'Points Color',
        value: '',
        enum: [{id: 'A1Current', name: 'A1Current', value: '#333333'},
               {id: 'A2Current', name: 'A2Current', value: '#0000ff'},
               {id: 'A3Current', name: 'A3Current', value: '#ff00ff'},
               {id: 'A4Current', name: 'A4Current', value: '#ff0000'},
               {id: 'A5Current', name: 'A5Current', value: '#00ff00'}],
        handler$: (res: any) => {
          return Observable.create(observer => {
            const temp = res;
            observer.next(temp);
          });
        }
      },
      {
        id: 'interval',
        type: ControlType.radio,
        name: 'Interval',
        value: 'minute',
        enum: ['minute', 'hour', 'day'],
        handler$: (res: any) => {
          return Observable.create(observer => {
            const temp = res;
            observer.next(temp);
          });
        }
      },
    ];
    //   controlModel.handler$(form.value).subscribe(
    //     (value) => {
    //       form =
    //     }
    //   );
    // const inputModel: InputLabelModel = {
    //   id: 'dataSource',
    //   type: 'text',
    //   label: 'DataSources',
    //   placeholder: 'pls input here',
    //   value: 'initial text',
    //   handler: ((a, b) => {
    //     this.log(a, b);
    //   }),
    //   style: {
    //     fxLayout: Direction.row,
    //     fxLayoutGap: '20px',
    //     fxLayoutAlign: 'center center',
    //     height: '100px',
    //     margin: '20px 0 0 0'
    //   }
    // };
    // const singleModel: SingleSelectModel = {
    //   id: 'interval',
    //   type: 'radio',
    //   label: 'Interval',
    //   options: [
    //     {
    //       label: 'week',
    //       value: 'week',
    //     },
    //     {
    //       label: 'day',
    //       value: 'day',
    //     },
    //     {
    //       label: 'hour',
    //       value: 'hour',
    //     },
    //   ],
    //   selectedOption: 'hour',
    //   handler: ((a, b) => {
    //     this.log(a, b);
    //   })
    // };
    // const dropDownModel: SingleSelectModel = {
    //   id: 'dataTypes',
    //   type: 'dropDown',
    //   label: 'DataTypes',
    //   options: [
    //     {
    //       label: 'raw',
    //       value: 'raw',
    //     },
    //     {
    //       label: 'product-line',
    //       value: 'product-line',
    //     },
    //   ],
    //   selectedOption: '',
    //   handler: ((a, b) => {
    //     this.log(a, b);
    //   })
    // };
    // const multiModel: MultiSelectModel = {
    //   id: 'points',
    //   type: 'checkbox',
    //   label: 'Points',
    //   options: [
    //     {
    //       id: 'A1Current',
    //       value: 'A1Current',
    //       checked: true
    //     },
    //     {
    //       id: 'A2Current',
    //       value: 'A2Current',
    //       checked: true,
    //     },
    //     {
    //       id: 'A3Current',
    //       value: 'A3Current',
    //       checked: false,
    //     }
    //   ],
    //   handler: ((a, b) => {
    //     this.log(a, b);
    //   })
    // };
    // const colorPickerModel: MultiSelectModel = {
    //   id: 'pointcolor',
    //   type: 'colorPicker',
    //   label: 'Points Colors',
    //   options: [
    //     {
    //       id: 'A1Current',
    //       label: 'A1Current',
    //       value: '#ff0000',
    //       checked: true
    //     },
    //     {
    //       id: 'A2Current',
    //       label: 'A2Current',
    //       value: '#00ff00',
    //       checked: true,
    //     },
    //     {
    //       id: 'A3Current',
    //       label: 'A3Current',
    //       value: '#0000ff',
    //       checked: false,
    //     }
    //   ],
    //   handler: ((a, b) => {
    //     this.log(a, b);
    //   })
    // };
    // this.formModel = [inputModel, dropDownModel, multiModel, colorPickerModel, singleModel];
  }

  log(message, b) {
    console.log(message, b);
  }

}
