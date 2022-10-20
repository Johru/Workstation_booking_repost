import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';
import { BuildingService } from 'src/app/services/building.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'dashboard-cities',
  templateUrl: './dashboard-cities.component.html',
  styleUrls: ['./dashboard-cities.component.css'],
})
export class DashboardCitiesComponent implements OnInit {
  buildingList?: Building[];
  selectedCityValue?: string;
  cityList?: any;
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef<any>;
  loggedIn: boolean = false;

  constructor(private bs: BuildingService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;
    }
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
