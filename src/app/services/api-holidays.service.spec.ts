import { TestBed } from '@angular/core/testing';

import { ApiHolidaysService } from './api-holidays.service';

describe('ApiHolidaysService', () => {
  let service: ApiHolidaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHolidaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
