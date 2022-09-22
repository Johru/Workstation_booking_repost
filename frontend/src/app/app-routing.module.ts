import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBuildingComponent } from './components/admin-building/admin-building.component';
import { AdminNavPanelComponent } from './components/admin-nav-panel/admin-nav-panel.component';

const routes: Routes = [
  {
    path: '/admin',
    component: AdminNavPanelComponent,
    outlet: 'adminRouter',
    children: [{ path: '/building', component: AdminBuildingComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
