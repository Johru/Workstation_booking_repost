import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WorkstationFormComponent } from './components/workstation-selection-book/workstation-form/workstation-form.component';
import { WorkstationTabComponent } from './components/workstation-selection-book/workstation-tab/workstation-tab.component';
import { WorkstationSelectionBookComponent } from './components/workstation-selection-book/workstation-selection-book.component';
import { ShowSeatsComponent } from './components/workstation-selection-book/show-seats/show-seats.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/workstation-selection-book/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkstationFormComponent,
    WorkstationTabComponent,
    WorkstationSelectionBookComponent,
    ShowSeatsComponent,
    ConfirmModalComponent,
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
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
