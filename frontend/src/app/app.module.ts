import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuildingNewComponent } from './components/building-admin/building-new/building-new.component';
import { BuildingDashboardComponent } from './components/building-admin/building-dashboard/building-dashboard.component';

import { BuildingFloorComponent } from './components/building-admin/building-floor/building-floor.component';

import { FloorListComponent } from './components/building-admin/building-floor/floor-list/floor-list.component';
import { FloorNewComponent } from './components/building-admin/building-floor/floor-new/floor-new.component';
import { WorkstationManagementComponent } from './components/building-admin/building-floor/floor-list/workstation-management/workstation-management.component';
import { WorkstationPreviewInputComponent } from './components/building-admin/building-floor/floor-list/workstation-preview-input/workstation-preview-input.component';

import { ConfirmDeleteComponent } from './components/building-admin/building-floor/floor-list/confirm-delete/confirm-delete.component';
import { WorkstationPreviewEditComponent } from './components/building-admin/building-floor/floor-list/workstation-preview-edit/workstation-preview-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildingNewComponent,
    BuildingDashboardComponent,

    BuildingFloorComponent,

    FloorListComponent,
    FloorNewComponent,
    WorkstationManagementComponent,
    WorkstationPreviewInputComponent,

    ConfirmDeleteComponent,
    WorkstationPreviewEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
