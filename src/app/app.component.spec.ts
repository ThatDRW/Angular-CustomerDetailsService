import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeAll(() => {
    window.onbeforeunload = () => "Uhm... What?";
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        SharedModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();;

  });



  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-customerdetailsservice'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-customerdetailsservice');
  });
});
