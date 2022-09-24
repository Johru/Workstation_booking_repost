import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationPreviewInputComponent } from './workstation-preview-input.component';

describe('WorkstationPreviewInputComponent', () => {
  let component: WorkstationPreviewInputComponent;
  let fixture: ComponentFixture<WorkstationPreviewInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstationPreviewInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkstationPreviewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
