import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavPanelComponent } from './admin-nav-panel.component';

describe('AdminNavPanelComponent', () => {
  let component: AdminNavPanelComponent;
  let fixture: ComponentFixture<AdminNavPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNavPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNavPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
