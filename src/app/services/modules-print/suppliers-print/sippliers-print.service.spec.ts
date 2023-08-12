import { TestBed } from '@angular/core/testing';

import { SippliersPrintService } from './sippliers-print.service';

describe('SippliersPrintService', () => {
  let service: SippliersPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SippliersPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
