import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCitiesComponent } from './dashboard-cities.component';

describe('DashboardCitiesComponent', () => {
  let component: DashboardCitiesComponent;
  let fixture: ComponentFixture<DashboardCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCitiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
