import { TestBed } from '@angular/core/testing';

import { VendorsPrintService } from './vendors-print.service';

describe('VendorsPrintService', () => {
  let service: VendorsPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorsPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
