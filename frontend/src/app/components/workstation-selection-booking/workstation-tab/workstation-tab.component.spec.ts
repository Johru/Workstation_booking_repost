import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationTabComponent } from './workstation-tab.component';

describe('WorkstationTabComponent', () => {
  let component: WorkstationTabComponent;
  let fixture: ComponentFixture<WorkstationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkstationTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkstationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
