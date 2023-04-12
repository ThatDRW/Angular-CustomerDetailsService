import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerComponent } from './add-customer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerService } from '../../../core/services/customer.service';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddCustomerComponent', () => {
  let component: AddCustomerComponent;
  let fixture: ComponentFixture<AddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerComponent ],
      imports: [
        HttpClientTestingModule,
        NgbModule,
        FormsModule
      ],
      providers: [
        CustomerService,
        ErrorResponseUtilService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
