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
import { RegisterComponent } from './components/register/register.component';
//material.io modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    WorkstationFormComponent,
    WorkstationTabComponent,
    WorkstationSelectionBookingComponent,
    SeatsComponent,
    ConfirmModalComponent,
    RegisterComponent,
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
    HttpClientModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
