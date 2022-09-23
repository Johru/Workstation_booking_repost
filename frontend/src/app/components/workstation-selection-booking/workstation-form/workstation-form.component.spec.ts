import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationFormComponent } from './workstation-form.component';

describe('WorkstationFormComponent', () => {
  let component: WorkstationFormComponent;
  let fixture: ComponentFixture<WorkstationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkstationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkstationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
