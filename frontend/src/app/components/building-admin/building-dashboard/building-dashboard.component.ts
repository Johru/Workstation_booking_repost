import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building } from '../../../helpingHand/buidling';
import { BuildingNewService } from 'src/app/services/building-new.service';

@Component({
  selector: 'building-dashboard',
  templateUrl: './building-dashboard.component.html',
  styleUrls: ['./building-dashboard.component.css'],
})
export class BuildingDashboardComponent implements OnInit {
  actualBuilding?: Building;
  buildingId = 0;

  constructor(
    private buildingService: BuildingNewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const nr = Number(this.route.snapshot.params['id']);
    if (!nr) {
      this.buildingId = 0;
    } else {
      this.buildingId = nr;
      this.getBuilding();
    }
  }

  addBuilding(newBuilding: Building) {
    this.buildingService.addBuilding(newBuilding);
  }

  getBuilding(): void {
    this.actualBuilding = this.buildingService.getBuilding(this.buildingId);
  }
}
