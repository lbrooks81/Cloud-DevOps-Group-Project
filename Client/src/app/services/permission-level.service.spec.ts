import { TestBed } from '@angular/core/testing';

import { PermissionLevelService } from './permission-level.service';

describe('PermissionLevelService', () => {
  let service: PermissionLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
