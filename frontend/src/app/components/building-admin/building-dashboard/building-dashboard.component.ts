import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building } from '../../../helpingHand/buidling';
import { BuildingNewService } from 'src/app/services/building-new.service';

@Component({
  selector: 'building-dashboard',
  templateUrl: './building-dashboard.component.html',
  styleUrls: ['./building-dashboard.component.css'],
})
export class BuildingDashboardComponent implements OnInit {
  public buildingId?: number;

  constructor(
    private buildingService: BuildingNewService,
    private route: ActivatedRoute
  ) {}

  addBuilding(newBuilding: Building) {
    this.buildingService.addBuilding(newBuilding);
  }

  ngOnInit() {
    let nr: number = Number(this.route.snapshot.params['id']);
    this.buildingId = nr;
  }
}
