import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitForLogoComponent } from './circuit-for-logo.component';

describe('CircuitForLogoComponent', () => {
  let component: CircuitForLogoComponent;
  let fixture: ComponentFixture<CircuitForLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitForLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitForLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
