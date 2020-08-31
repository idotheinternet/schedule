import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { CalendarComponent } from './calendar/calendar.component';
import { InstallersComponent } from './installers/installers.component';
import { CustomerComponent } from './customer/customer.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    CalendarComponent,
    InstallersComponent,
    CustomerComponent,
    ScheduleComponent,
    NewScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
