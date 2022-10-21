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
import { AuthGuardService } from './services/auth-guard.service';
import { BuildingDashboardComponent } from './components/building-admin/building-dashboard/building-dashboard.component';
import { BuildingFloorComponent } from './components/building-admin/building-floor/building-floor.component';
import { UserFloorsAccordionComponent } from './components/user-floors-accordion/user-floors-accordion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'admin', redirectTo: '/admin/buildings', pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: NavpanelComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'building/:id/floors',
        component: UserFloorsAccordionComponent,
        canActivate: [AuthGuardService],
      },
      { path: 'dashboard', component: DashboardComponent },
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
    canActivate: [RoleGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
