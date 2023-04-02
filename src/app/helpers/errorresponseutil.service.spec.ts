import { TestBed } from '@angular/core/testing';

import { ErrorResponseUtilService } from './errorresponseutil.service';

describe('ErrorresponseutilService', () => {
  let service: ErrorResponseUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorResponseUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
