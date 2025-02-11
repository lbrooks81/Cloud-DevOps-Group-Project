import { TestBed } from '@angular/core/testing';

import { PurchasedPartService } from './purchased-part.service';

describe('PurchasedPartService', () => {
  let service: PurchasedPartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasedPartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
