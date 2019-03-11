import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogConfigComponent } from './dailog-config.component';

describe('DailogConfigComponent', () => {
  let component: DailogConfigComponent;
  let fixture: ComponentFixture<DailogConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailogConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
