import { TestBed } from '@angular/core/testing';

import { EmpInfoService } from './emp-info.service';

describe('EmpInfoService', () => {
  let service: EmpInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
