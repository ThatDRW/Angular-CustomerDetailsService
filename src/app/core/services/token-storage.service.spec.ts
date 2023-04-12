import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TokenStorageService', () => {
  let service: TokenStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            TokenStorageService,
        ]
    });
    service = TestBed.inject(TokenStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
