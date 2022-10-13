import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavpanelComponent } from './components/navpanel/navpanel.component';
import { AdminBuildingComponent } from './components/admin-building/admin-building.component';
import { AdminNavPanelComponent } from './components/admin-nav-panel/admin-nav-panel.component';
import { UsersComponent } from './components/users/users.component';
import { WorkstationSelectionBookingComponent } from './components/workstation-selection-booking/workstation-selection-booking.component';
import { RoleGuardService } from './services/role-guard.service';
import { BuildingDashboardComponent } from './components/building-admin/building-dashboard/building-dashboard.component';
import { BuildingFloorComponent } from './components/building-admin/building-floor/building-floor.component';

const routes: Routes = [
  // users route will be a child of admin route on merge
  { path: 'users', component: UsersComponent },
  { path: 'wstation', component: WorkstationSelectionBookingComponent },
  {
    path: '',
    component: NavpanelComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminNavPanelComponent,
    children: [
      { path: 'buildings', component: AdminBuildingComponent },
      { path: 'edit/building', component: BuildingDashboardComponent },
      { path: 'edit/building/:id', component: BuildingDashboardComponent },
      {
        path: 'edit/building/:id/floor',
        component: BuildingFloorComponent,
      },
    ],
    //roleguard commented in developer mode, but working
    //canActivate: [RoleGuardService],
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
