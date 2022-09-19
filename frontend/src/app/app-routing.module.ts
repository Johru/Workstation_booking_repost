import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkstationFormComponent } from './components/workstation-selection-book/workstation-form/workstation-form.component';
import { WorkstationSelectionBookComponent } from './components/workstation-selection-book/workstation-selection-book.component';

const routes: Routes = [
  { path: 'wstation', component: WorkstationSelectionBookComponent },
  { path: '', redirectTo: '/wstation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
