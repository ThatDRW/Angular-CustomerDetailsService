import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenStorageService } from '../../core/services/token-storage.service';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        declarations: [
            LandingComponent,
        ],
        providers: [
            TokenStorageService
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
