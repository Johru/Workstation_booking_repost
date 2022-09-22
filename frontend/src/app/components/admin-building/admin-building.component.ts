import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';
import { BuildingService } from 'src/app/services/building.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'admin-building',
  templateUrl: './admin-building.component.html',
  styleUrls: ['./admin-building.component.css'],
})
export class AdminBuildingComponent implements OnInit {
  buildingList?: Building[];
  value?: string;
  cityList?: any;
  checkvalue: number = 5;

  @ViewChild('cardContent', { read: ElementRef })
  public cardContent!: ElementRef<any>;

  constructor(private bs: BuildingService, private vps: ViewportScroller) {}

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

  public scrollRight(): void {
    this.cardContent.nativeElement.scrollTo({
      left: this.cardContent.nativeElement.scrollLeft + 300,
      behavior: 'smooth',
    });
  }
  public scrollLeft() {
    this.cardContent.nativeElement.scrollTo({
      left: this.cardContent.nativeElement.scrollLeft - 300,
      behavior: 'smooth',
    });
  }
}
