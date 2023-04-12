import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserComponent } from './login-user.component';
import { UserService } from '../../../core/services/user.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUserComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [
        UserService,
        TokenStorageService,
        ErrorResponseUtilService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
