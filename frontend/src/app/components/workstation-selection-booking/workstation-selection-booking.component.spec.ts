import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationSelectionBookingComponent } from './workstation-selection-booking.component';

describe('WorkstationSelectionBookComponent', () => {
  let component: WorkstationSelectionBookingComponent;
  let fixture: ComponentFixture<WorkstationSelectionBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkstationSelectionBookingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkstationSelectionBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
