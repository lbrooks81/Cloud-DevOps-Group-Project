import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseViewComponent } from './database-view.component';

describe('DatabaseViewComponent', () => {
  let component: DatabaseViewComponent;
  let fixture: ComponentFixture<DatabaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
