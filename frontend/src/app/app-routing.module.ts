import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBuildingComponent } from './components/admin-building/admin-building.component';
import { AdminNavPanelComponent } from './components/admin-nav-panel/admin-nav-panel.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavpanelComponent } from './components/navpanel/navpanel.component';
import { WorkstationSelectionBookingComponent } from './components/workstation-selection-booking/workstation-selection-booking.component';

const routes: Routes = [
  // users route will be a child of admin route on merge
  { path: 'users', component: UsersComponent },
  { path: 'wstation', component: WorkstationSelectionBookingComponent },
  {
    path: 'admin',
    component: AdminNavPanelComponent,
    children: [{ path: 'buildings', component: AdminBuildingComponent }],
  },
  {
    path: '',
    component: NavpanelComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
