import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuildingDashboardComponent } from './components/building-admin/building-dashboard/building-dashboard.component';
import { BuildingFloorComponent } from './components/building-admin/building-floor/building-floor.component';
import { BuildingsAdminMainComponent } from './components/building-admin/buildings-admin-main/buildings-admin-main.component';

const routes: Routes = [] = [
  { path: 'buildings', component: BuildingsAdminMainComponent}, // for testing purpose
  { path: 'edit/building', component: BuildingDashboardComponent },
  { path: 'edit/building/floor', component: BuildingFloorComponent }
]

// {
//   path: 'admin/edit/building', component: BuildingDashboardComponent, children: [
//     { path: 'floor', component: BuildingFloorComponent }
//   ]
// }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
