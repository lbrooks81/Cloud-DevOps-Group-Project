import { TestBed } from '@angular/core/testing';

import { MicroComponentService } from './micro-component.service';

describe('MicroComponentService', () => {
  let service: MicroComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
