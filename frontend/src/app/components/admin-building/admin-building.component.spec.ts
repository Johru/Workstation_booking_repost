import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuildingComponent } from './admin-building.component';

describe('AdminBuildingComponent', () => {
  let component: AdminBuildingComponent;
  let fixture: ComponentFixture<AdminBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBuildingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
