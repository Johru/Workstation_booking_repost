import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkstationFormComponent } from './components/workstation-form/workstation-form.component';

const routes: Routes = [
  {path: 'wstation', component: WorkstationFormComponent},
  {path: '', redirectTo: '/wstation',pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
