import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationEmptyComponent } from './workstation-empty.component';

describe('WorkstationEmptyComponent', () => {
  let component: WorkstationEmptyComponent;
  let fixture: ComponentFixture<WorkstationEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstationEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkstationEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
