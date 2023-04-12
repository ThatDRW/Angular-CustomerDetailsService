
import { of } from 'rxjs';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCustomersComponent } from './list-customers.component';
// import { ErrorResponseUtilService } from 'src/app/core/helpers/errorresponseutil.service';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import 'zone.js/dist/zone-testing.js'
import { CustomerService } from '../../../core/services/customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerModule } from '../../customer.module';
import { UserRoutingModule } from '../../../user/user-routing.module';
import { CustomerRoutingModule } from '../../customer-routing.module';
import { UserModule } from '../../../user/user.module';
import { AuthGuardGuard } from '../../../core/helpers/auth-guard.guard';
import { authGuard } from '../../../core/helpers/auth.guard';
import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Customer } from '../../../core/models/customer.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { TokenStorageService } from '../../../core/services/token-storage.service';


class TokenStorageServiceMock {

}



describe('ListCustomersComponent', () => {
    let component: ListCustomersComponent;
    let fixture: ComponentFixture<ListCustomersComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListCustomersComponent],
            imports: [
                CustomerModule
            ],
            providers: [
                CustomerService,
                { provide: TokenStorageService, class: TokenStorageServiceMock },
                //TokenStorageService,
                { provide: ErrorResponseUtilService, class: TokenStorageServiceMock },
                { provide: AuthGuardGuard, class: TokenStorageServiceMock },
            ]
        })
        .overrideComponent(ListCustomersComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .compileComponents();

        fixture = TestBed.createComponent(ListCustomersComponent);
        component = fixture.componentInstance;
        component.viewAll = false;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
