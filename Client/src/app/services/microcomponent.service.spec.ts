import { TestBed } from '@angular/core/testing';

import { MicrocomponentService } from './microcomponent.service';

describe('MicrocomponentService', () => {
  let service: MicrocomponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrocomponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
