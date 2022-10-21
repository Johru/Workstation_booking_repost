import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BuildingService } from 'src/app/services/building.service';
import { Building } from 'src/app/helpingHand/buidling';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean = false;
  cityOne?: string;
  cityTwo?: string;
  buildingListOne?: Building[] = [];
  buildingListTwo?: Building[] = [];
  seatCount?: number = 0;

  constructor(private authService: AuthService, private bs: BuildingService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;
    }
    this.getTwoRandomCities();
  }

  getTwoRandomCities() {
    this.getCities().subscribe({
      next: data => {
        const cities = data;
        this.cityOne =
          cities[Math.floor(Math.random() * cities.length)].building_city;
        const block = cities.find(
          (city: any) => city.building_city == this.cityOne
        );
        const index = cities.indexOf(block);
        cities.splice(index, 1);
        this.pushBuildingsToLocalArrays(this.cityOne!, this.buildingListOne!);
        this.cityTwo =
          cities[Math.floor(Math.random() * cities.length)].building_city;
        this.pushBuildingsToLocalArrays(this.cityTwo!, this.buildingListTwo!);
      },
      error: err => {
        console.error(err);
      },
    });
  }

  getCities(): Observable<any> {
    return this.bs.getCityList();
  }

  pushBuildingsToLocalArrays(city: string, building: Building[]) {
    this.getBuildings().subscribe(data => {
      for (const item of data) {
        if (item.building_city == city) {
          building.push(item);
          for (let i = 0; i < item.floor.length; i++) {
            for (let j = 0; j < item.floor[i].workstation.length; j++) {
              const seats = item.floor[i].workstation[j].SCount;
              this.seatCount += seats;
            }
          }
          item.seatCount = this.seatCount;
          this.seatCount = 0;
        }
      }
    });
  }

  getBuildings(): Observable<any> {
    return this.bs.getBuildings();
  }

  public scrollRight(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    const sibling = target.previousElementSibling;
    sibling!.scrollLeft += 250;
  }

  public scrollLeft(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const sibling = target.nextElementSibling;
    sibling!.scrollLeft -= 250;
  }
}
