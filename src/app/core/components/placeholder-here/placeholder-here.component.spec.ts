import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderHereComponent } from './placeholder-here.component';

describe('PlaceholderHereComponent', () => {
  let component: PlaceholderHereComponent;
  let fixture: ComponentFixture<PlaceholderHereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceholderHereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceholderHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
