import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';


const routes: Routes = [
  {path: 'schedule', component: SchedulerComponent, children: [{path: 'schedule/:id', component: ScheduleComponent}, {path: 'new', component: NewScheduleComponent}]}, 
  {path: '', redirectTo: '/schedule', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
