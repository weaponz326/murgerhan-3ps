import { TestBed } from '@angular/core/testing';

import { VendorsApiService } from './vendors-api.service';

describe('VendorsApiService', () => {
  let service: VendorsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
