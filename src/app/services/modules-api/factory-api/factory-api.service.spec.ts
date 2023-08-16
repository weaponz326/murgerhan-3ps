import { TestBed } from '@angular/core/testing';

import { FactoryApiService } from './factory-api.service';

describe('FactoryApiService', () => {
  let service: FactoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
