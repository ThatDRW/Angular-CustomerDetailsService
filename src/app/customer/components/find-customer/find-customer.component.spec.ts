import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCustomerComponent } from './find-customer.component';
import { CustomerService } from '../../../core/services/customer.service';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('FindCustomerComponent', () => {
  let component: FindCustomerComponent;
  let fixture: ComponentFixture<FindCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCustomerComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        CustomerService,
        ErrorResponseUtilService,
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    paramMap:{
                        has(id:String): boolean {return true;},
                        get(id:String): String {return 'query';}
                    },
                },
            }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
