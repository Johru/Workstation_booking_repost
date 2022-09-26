import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationCrossroadComponent } from './workstation-crossroad.component';

describe('WorkstationCrossroadComponent', () => {
  let component: WorkstationCrossroadComponent;
  let fixture: ComponentFixture<WorkstationCrossroadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstationCrossroadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkstationCrossroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
