//angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavpanelComponent } from './components/navpanel/navpanel.component';
//material.io modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserListComponent,
    UserTabComponent,
    WorkstationFormComponent,
    WorkstationTabComponent,
    WorkstationSelectionBookingComponent,
    SeatsComponent,
    ConfirmModalComponent,
    AdminBuildingComponent,
    AdminNavPanelComponent,
    BuildingCardComponent,
    ReservationListComponent,
    DeleteModalComponent,
    RegisterComponent,
    LoginComponent,
    NavpanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
