import { TestBed } from '@angular/core/testing';

import { AggregateTableService } from './aggregate-table.service';

describe('AggregateTableService', () => {
  let service: AggregateTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregateTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
