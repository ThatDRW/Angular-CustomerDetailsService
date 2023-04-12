import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCustomersComponent } from './all-customers.component';
import { ListCustomersComponent } from '../list-customers/list-customers.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomerModule } from '../../customer.module';

describe('AllCustomersComponent', () => {
  let component: AllCustomersComponent;
  let fixture: ComponentFixture<AllCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCustomersComponent ],
      imports: [ CustomerModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
