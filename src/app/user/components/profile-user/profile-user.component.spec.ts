import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserComponent } from './profile-user.component';
import { TokenStorageService } from '../../../core/services/token-storage.service';

describe('ProfileUserComponent', () => {
  let component: ProfileUserComponent;
  let fixture: ComponentFixture<ProfileUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserComponent ],
      providers: [ TokenStorageService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
