import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { WorkstationSelectionBookingComponent } from './components/workstation-selection-booking/workstation-selection-booking.component';

const routes: Routes = [
  { path: 'admin/users', component: UsersComponent },
  { path: 'wstation', component: WorkstationSelectionBookingComponent },
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
