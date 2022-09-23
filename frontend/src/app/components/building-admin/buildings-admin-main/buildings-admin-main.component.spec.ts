import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsAdminMainComponent } from './buildings-admin-main.component';

describe('BuildingsAdminMainComponent', () => {
  let component: BuildingsAdminMainComponent;
  let fixture: ComponentFixture<BuildingsAdminMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingsAdminMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingsAdminMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
