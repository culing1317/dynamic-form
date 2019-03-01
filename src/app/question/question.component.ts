import { Component, OnInit, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable as RxObservable } from 'rxjs';
import {
  DynamicFormComponent,
  ConfigFormData,
  ControlType,
  Direction
} from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {title = 'app';
formDataModel: Array<ConfigFormData>;
dynamicStyle;

constructor(private sanitizer: DomSanitizer) { }

get initStyle () {
  const dyStyle = {
    '--marginPar': '15px',
    'margin-top': '20px',
    'opacity': 0.4,
    '--bgColor': 'yellow'
  };
  return dyStyle;
}

@HostBinding('style')
get style() {
  return this.sanitizer.bypassSecurityTrustStyle(
    `--bgColor: yellow`
  );
}

ngOnInit() {

  this.formDataModel = [
    {
      id: 'componentName',
      type: ControlType.input,
      name: 'componentName',
      value: 'initial text',
      placeholder: 'pls input here',
      handler$: (res: any) => {
        return RxObservable.create(observer => {
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
        return RxObservable.create(observer => {
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
        return RxObservable.create(observer => {
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
        return RxObservable.create(observer => {
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
        return RxObservable.create(observer => {
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
        return RxObservable.create(observer => {
          const temp = res;
          observer.next(temp);
        });
      }
    },
  ];
}

}
