import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { DetailsCustomerComponent } from './details-customer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerService } from '../../../core/services/customer.service';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('DetailsCustomerComponent', () => {
  let component: DetailsCustomerComponent;
  let fixture: ComponentFixture<DetailsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCustomerComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [
        CustomerService,
        ErrorResponseUtilService,
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    paramMap:{
                        has(id:String): boolean {return true;},
                        get(id:String): number {return 1;}
                    },
                },
            }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
