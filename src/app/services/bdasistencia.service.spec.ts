import { TestBed } from '@angular/core/testing';

import { BdasistenciaService } from './bdasistencia.service';

describe('BdasistenciaService', () => {
  let service: BdasistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdasistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
