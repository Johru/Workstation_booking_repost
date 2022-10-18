import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';
import { BuildingService } from 'src/app/services/building.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-building',
  templateUrl: './admin-building.component.html',
  styleUrls: ['./admin-building.component.css'],
})
export class AdminBuildingComponent implements OnInit {
  buildingList?: Building[] = [];
  seatCount?: number = 0;
  selectedCityValue?: string;
  cityList?: { building_city: string }[] = [];
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef<any>;

  constructor(private bs: BuildingService) {}

  ngOnInit() {
    this.pushCitiesToLocalArrays();
    this.pushBuildingsToLocalArrays();
  }

  pushCitiesToLocalArrays() {
    this.getCities().subscribe((data) => {
      for (let item of data) {
        this.cityList?.push(item);
      }
      this.selectedCityValue = data[0].building_city;
    });
  }

  pushBuildingsToLocalArrays() {
    this.getBuildings().subscribe((data) => {
      for (let item of data) {
        if (
          item.building_city.toLowerCase() ==
          this.selectedCityValue!.toLowerCase()
        ) {
          this.buildingList?.push(item);
          for (let i = 0; i < item.floor.length; i++) {
            for (let j = 0; j < item.floor[i].workstation.length; j++) {
              let seats = item.floor[i].workstation[j].SCount;
              this.seatCount += seats;
            }
          }
          item.seatCount = this.seatCount;
          this.seatCount = 0;
        }
      }
    });
  }

  getCities(): Observable<any> {
    return this.bs.getCityList();
  }

  getBuildings(): Observable<any> {
    return this.bs.getBuildings();
  }

  onChange() {
    this.buildingList = [];
    this.pushBuildingsToLocalArrays();
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
