import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'admin-building',
  templateUrl: './admin-building.component.html',
  styleUrls: ['./admin-building.component.css'],
})
export class AdminBuildingComponent implements OnInit {
  buildingList?: Building[];
  selectedCityValue?: string;
  cityList?: any;

  @ViewChild('cardContent', { read: ElementRef })
  public cardContent!: ElementRef<any>;
  constructor(private bs: BuildingService) {}

  ngOnInit(): void {
    this.getCities();
    this.selectedCityValue = this.cityList[0].city;
    this.getBuildings();
  }

  getCities() {
    this.cityList = this.bs.getCityList();
  }

  getBuildings() {
    this.buildingList = this.bs.getBuildings();
  }

  onChange() {
    this.getBuildings();
  }

  public scrollRight(): void {
    this.cardContent.nativeElement.scrollTo({
      left: this.cardContent.nativeElement.scrollLeft + 238,
      behavior: 'smooth',
    });
  }

  public scrollLeft() {
    this.cardContent.nativeElement.scrollTo({
      left: this.cardContent.nativeElement.scrollLeft - 238,
      behavior: 'smooth',
    });
  }
}
