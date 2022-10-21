import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';
import { BuildingService } from 'src/app/services/building.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

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
  isAdmin: boolean = false;

  constructor(
    private bs: BuildingService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pushCitiesToLocalArrays();
    if (this.authService.isAdmin()) {
      this.isAdmin = true;
    }
  }

  pushCitiesToLocalArrays() {
    this.bs.getCityList().subscribe(data => {
      for (const item of Object.entries(data)) {
        this.cityList?.push(item[1]);
      }
      this.selectedCityValue = Object.entries(data)[0][1].building_city;
      this.pushBuildingsToLocalArrays();
    });
  }

  pushBuildingsToLocalArrays() {
    this.bs.getBuildings().subscribe(data => {
      for (const item of Object.entries(data)) {
        if (
          item[1].building_city.toLowerCase() ==
          this.selectedCityValue!.toLowerCase()
        ) {
          this.buildingList?.push(item[1]);
          for (let i = 0; i < item[1].floor.length; i++) {
            for (let j = 0; j < item[1].floor[i].workstation.length; j++) {
              const seats = item[1].floor[i].workstation[j].SCount;
              this.seatCount += seats;
            }
          }
          item[1].seatCount = this.seatCount;
          this.seatCount = 0;
        }
      }
    });
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
