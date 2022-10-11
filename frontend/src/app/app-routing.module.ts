import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavpanelComponent } from './components/navpanel/navpanel.component';
import { AdminBuildingComponent } from './components/admin-building/admin-building.component';
import { AdminNavPanelComponent } from './components/admin-nav-panel/admin-nav-panel.component';
import { UsersComponent } from './components/users/users.component';
import { WorkstationSelectionBookingComponent } from './components/workstation-selection-booking/workstation-selection-booking.component';
import { BuildingDashboardComponent } from './components/building-admin/building-dashboard/building-dashboard.component';
import { BuildingFloorComponent } from './components/building-admin/building-floor/building-floor.component';

const routes: Routes = [
  { path: 'wstation', component: WorkstationSelectionBookingComponent },
  { path: 'admin', redirectTo: '/admin/buildings', pathMatch: 'full' },
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
      { path: 'users', component: UsersComponent },
      { path: 'edit/building', component: BuildingDashboardComponent },
      { path: 'edit/building/:id', component: BuildingDashboardComponent },
      {
        path: 'edit/building/:id/floor',
        component: BuildingFloorComponent,
      },
    ],
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
