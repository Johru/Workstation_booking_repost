import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkstationSelectionBookingComponent } from './components/workstation-selection-booking/workstation-selection-booking.component';

const routes: Routes = [
  { path: 'wstation', component: WorkstationSelectionBookingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
