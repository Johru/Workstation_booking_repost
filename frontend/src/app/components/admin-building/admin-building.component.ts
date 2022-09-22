import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'admin-building',
  templateUrl: './admin-building.component.html',
  styleUrls: ['./admin-building.component.css'],
})
export class AdminBuildingComponent implements OnInit {
  buildingList?: Building[];
  value?: string;
  cityList?: any;

  constructor(private bs: BuildingService) {}

  ngOnInit(): void {
    this.getCities();
    this.value = this.cityList[0].city;
    this.getBuildings();
  }

  getCities() {
    this.cityList = this.bs.getCityList();
  }
  getBuildings() {
    this.buildingList = this.bs.getBuildings();
  }

  onChange(e: any) {
    this.getBuildings();
  }
  goLeft() {}
  goRight() {}
}
