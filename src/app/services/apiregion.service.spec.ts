import { TestBed } from '@angular/core/testing';

import { ApiregionService } from './apiregion.service';

describe('ApiregionService', () => {
  let service: ApiregionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiregionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
