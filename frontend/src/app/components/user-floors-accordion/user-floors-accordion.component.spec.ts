import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFloorsAccordionComponent } from './user-floors-accordion.component';

describe('UserFloorsAccordionComponent', () => {
  let component: UserFloorsAccordionComponent;
  let fixture: ComponentFixture<UserFloorsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFloorsAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFloorsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
