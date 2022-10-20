import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BuildingService } from 'src/app/services/building.service';
import { Building } from 'src/app/helpingHand/buidling';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean = false;
  cityOne?: string;
  cityTwo?: string;
  isAdmin?: boolean = false;
  buildingList?: Building[];
  cardContent!: ElementRef<any>;

  constructor(private authService: AuthService, private bs: BuildingService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;
    }
  }

  getTwoRandomCities() {
    this.bs.getCityList().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
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
