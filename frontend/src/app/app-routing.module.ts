import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkstationSelectionBookComponent } from './components/workstation-selection-book/workstation-selection-book.component';

const routes: Routes = [
  { path: 'wstation', component: WorkstationSelectionBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
