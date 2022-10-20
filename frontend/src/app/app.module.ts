//angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
//components
import { AppComponent } from './app.component';
import { WorkstationFormComponent } from './components/workstation-selection-booking/workstation-form/workstation-form.component';
import { WorkstationTabComponent } from './components/workstation-selection-booking/workstation-tab/workstation-tab.component';
import { WorkstationSelectionBookingComponent } from './components/workstation-selection-booking/workstation-selection-booking.component';
import { SeatsComponent } from './components/workstation-selection-booking/seats/seats.component';
import { ConfirmModalComponent } from './components/workstation-selection-booking/confirm-modal/confirm-modal.component';
import { AdminBuildingComponent } from './components/admin-building/admin-building.component';
import { AdminNavPanelComponent } from './components/admin-nav-panel/admin-nav-panel.component';
import { BuildingCardComponent } from './components/admin-building/building-card/building-card.component';
import { UsersComponent } from './components/users/users.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserTabComponent } from './components/users/user-list/user-tab/user-tab.component';
import { ReservationListComponent } from './components/users/user-list/reservation-list/reservation-list.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterPanelComponent } from './components/footer-panel/footer-panel.component';
import { BuildingNewComponent } from './components/building-admin/building-dashboard/building-new/building-new.component';
import { BuildingDashboardComponent } from './components/building-admin/building-dashboard/building-dashboard.component';
import { BuildingFloorComponent } from './components/building-admin/building-floor/building-floor.component';
import { FloorListComponent } from './components/building-admin/building-floor/floor-list/floor-list.component';
import { FloorNewComponent } from './components/building-admin/building-floor/floor-new/floor-new.component';
import { WorkstationManagementComponent } from './components/building-admin/building-floor/floor-list/workstation-management/workstation-management.component';
import { WorkstationPreviewInputComponent } from './components/building-admin/building-floor/floor-list/workstation-preview-input/workstation-preview-input.component';
import { ConfirmDeleteComponent } from './components/building-admin/building-floor/floor-list/confirm-delete/confirm-delete.component';
import { WorkstationPreviewEditComponent } from './components/building-admin/building-floor/floor-list/workstation-preview-edit/workstation-preview-edit.component';
import { BuildingEditComponent } from './components/building-admin/building-dashboard/building-edit/building-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavpanelComponent } from './components/navpanel/navpanel.component';
import { UserFloorsAccordionComponent } from './components/user-floors-accordion/user-floors-accordion.component';
//material.io modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

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
    UsersComponent,
    UserListComponent,
    UserTabComponent,
    WorkstationFormComponent,
    WorkstationTabComponent,
    WorkstationSelectionBookingComponent,
    SeatsComponent,
    ConfirmModalComponent,
    RegisterComponent,
    LoginComponent,
    NavpanelComponent,
    AdminBuildingComponent,
    AdminNavPanelComponent,
    BuildingCardComponent,
    ReservationListComponent,
    DeleteModalComponent,
    DashboardComponent,
    FooterPanelComponent,
    BuildingEditComponent,
    UserFloorsAccordionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    HttpClientModule,
    JwtModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
