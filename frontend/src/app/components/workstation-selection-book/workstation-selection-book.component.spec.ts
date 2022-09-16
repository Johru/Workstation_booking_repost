import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationSelectionBookComponent } from './workstation-selection-book.component';

describe('WorkstationSelectionBookComponent', () => {
  let component: WorkstationSelectionBookComponent;
  let fixture: ComponentFixture<WorkstationSelectionBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstationSelectionBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkstationSelectionBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
