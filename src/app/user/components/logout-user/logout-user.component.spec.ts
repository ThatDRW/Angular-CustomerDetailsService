import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutUserComponent } from './logout-user.component';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';

describe('LogoutUserComponent', () => {
  let component: LogoutUserComponent;
  let fixture: ComponentFixture<LogoutUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutUserComponent ],
      providers: [ ErrorResponseUtilService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
