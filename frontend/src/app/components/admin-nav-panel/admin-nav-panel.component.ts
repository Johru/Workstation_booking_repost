import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-nav-panel',
  templateUrl: './admin-nav-panel.component.html',
  styleUrls: ['./admin-nav-panel.component.css'],
})
export class AdminNavPanelComponent {
  constructor(private router: Router) {}

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
