import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationManagementComponent } from './workstation-management.component';

describe('WorkstationManagementComponent', () => {
  let component: WorkstationManagementComponent;
  let fixture: ComponentFixture<WorkstationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkstationManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkstationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
