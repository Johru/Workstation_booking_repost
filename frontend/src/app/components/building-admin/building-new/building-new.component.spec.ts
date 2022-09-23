import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingNewComponent } from './building-new.component';

describe('BuildingNewComponent', () => {
  let component: BuildingNewComponent;
  let fixture: ComponentFixture<BuildingNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
