import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [
        ErrorResponseUtilService,
        UserService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
