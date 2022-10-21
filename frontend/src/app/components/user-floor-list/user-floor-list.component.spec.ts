import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFloorListComponent } from './user-floor-list.component';

describe('UserFloorListComponent', () => {
  let component: UserFloorListComponent;
  let fixture: ComponentFixture<UserFloorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFloorListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFloorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
