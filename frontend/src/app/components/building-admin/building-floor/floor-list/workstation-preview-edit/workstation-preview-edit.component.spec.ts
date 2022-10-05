import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationPreviewEditComponent } from './workstation-preview-edit.component';

describe('WorkstationPreviewEditComponent', () => {
  let component: WorkstationPreviewEditComponent;
  let fixture: ComponentFixture<WorkstationPreviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstationPreviewEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkstationPreviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
