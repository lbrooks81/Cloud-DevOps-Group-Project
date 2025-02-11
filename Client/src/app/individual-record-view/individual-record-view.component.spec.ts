import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRecordViewComponent } from './individual-record-view.component';

describe('IndividualRecordViewComponent', () => {
  let component: IndividualRecordViewComponent;
  let fixture: ComponentFixture<IndividualRecordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualRecordViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualRecordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
