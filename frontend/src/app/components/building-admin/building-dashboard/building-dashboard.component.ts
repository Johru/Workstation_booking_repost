import { Component, OnInit } from '@angular/core';

import { Building } from 'src/app/help-files/buildind-interface';
import { BuildingService } from 'src/app/services/admin-edit/building.service';

@Component({
  selector: 'building-dashboard',
  templateUrl: './building-dashboard.component.html',
  styleUrls: ['./building-dashboard.component.css'],
})
export class BuildingDashboardComponent implements OnInit {
  constructor(private buildingService: BuildingService) {}

  ngOnInit(): void {}

  addBuilding(newBuilding: Building) {
    this.buildingService.addBuilding(newBuilding);
  }
}
