import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private authService: AuthService, private bs: BuildingService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;
    }
  }

  getTwoRandomCities() {}
}
