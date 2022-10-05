import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBuildingComponent } from './components/admin-building/admin-building.component';
import { AdminNavPanelComponent } from './components/admin-nav-panel/admin-nav-panel.component';
import { UsersComponent } from './components/users/users.component';
import { WorkstationSelectionBookingComponent } from './components/workstation-selection-booking/workstation-selection-booking.component';

const routes: Routes = [
  { path: 'wstation', component: WorkstationSelectionBookingComponent },
  { path: 'admin', redirectTo: '/admin/buildings', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminNavPanelComponent,
    children: [
      { path: 'buildings', component: AdminBuildingComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
