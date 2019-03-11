import { TestBed } from '@angular/core/testing';

import { DailogService } from './dailog.service';

describe('DailogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailogService = TestBed.get(DailogService);
    expect(service).toBeTruthy();
  });
});
