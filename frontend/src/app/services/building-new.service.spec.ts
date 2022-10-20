import { TestBed } from '@angular/core/testing';

import { BuildingNewService } from './building-new.service';

describe('BuildingNewService', () => {
  let service: BuildingNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
