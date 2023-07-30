import { TestBed } from '@angular/core/testing';

import { FormatIdService } from './format-id.service';

describe('FormatIdService', () => {
  let service: FormatIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
