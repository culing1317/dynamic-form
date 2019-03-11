import { Component, OnInit, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OverlayService, OverlayRef } from './overlay-container/component.service';
import {
  DynamicFormComponent,
  ConfigFormData,
  ControlType,
  Direction
} from './dynamic-form/dynamic-form.component';
import { DailogConfigComponent } from './dailog-config/dailog-config.component';
import { Observable, of, from } from 'rxjs';
import { DailogService } from './dailog.service';
import { BaseStyle } from './styleConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [DailogConfigComponent],
  providers: [OverlayService, DailogService],
})
export class AppComponent implements OnInit {
  title = 'app';
  formDataModel: Array<ConfigFormData>;
  constructor(
    private sanitizer: DomSanitizer,
    private overlayService: OverlayService,
    private confirmService: DailogService) { }

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
        id: 'dataGroup',
        type: ControlType.normalGroup,
        name: 'data group',
        child: [
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
            },
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
            enum: [{ id: 'A1Current', name: 'A1Current', value: true },
            { id: 'A2Current', name: 'A2Current', value: false },
            { id: 'A3Current', name: 'A3Current', value: true },
            { id: 'A4Current', name: 'A4Current', value: false },
            { id: 'A5Current', name: 'A5Current', value: true },
            { id: 'A6Current', name: 'A6Current', value: true },
            { id: 'A7Current', name: 'A7Current', value: true },
            { id: 'A8Current', name: 'A8Current', value: true }],
            handler$: (res: any) => {
              return Observable.create(observer => {
                const temp = res;
                observer.next(temp);
              });
            }
          },
        ]
      },

      {
        id: 'PointsColor',
        type: ControlType.colorPicker,
        name: 'Points Color',
        value: '',
        enum: [{ id: 'A1Current', name: 'A1Current', value: '#333333' },
        { id: 'A2Current', name: 'A2Current', value: '#0000ff' },
        { id: 'A3Current', name: 'A3Current', value: '#ff00ff' },
        { id: 'A4Current', name: 'A4Current', value: '#ff0000' },
        { id: 'A5Current', name: 'A5Current', value: '#00ff00' }],
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
      {
        id: 'setting',
        type: ControlType.normalGroup,
        name: 'Setting',
        value: '',
        child: [{
          id: 'A1Current',
          type: ControlType.tableGroup,
          name: 'A1Current',
          value: '',
          child: [
            {
              id: 'Min',
              type: ControlType.input,
              name: 'Min',
              value: '1',
            },
            {
              id: 'Max',
              type: ControlType.input,
              name: 'Max',
              value: '3',
            }
          ]
        }],
      }
    ];
  }
  log(message, b) {
    console.log(message, b);
  }

  open() {
    this.confirmService.open(this.formDataModel).subscribe((result) => {

        console.log('close dailog', result);

    });
  }
}
