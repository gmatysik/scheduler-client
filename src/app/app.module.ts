import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailComponent } from './task-detail.component';
import { DetailComponent }  from './detail.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TaskListComponent } from './taskList.component';
import { HttpModule }    from '@angular/http';
import {ScheduleModule} from 'primeng/schedule';
import * as jQuery from 'jquery';
import { MomentModule } from 'angular2-moment';
import 'jquery';
import 'moment';
import 'fullcalendar';
import {MyModel} from './scheduler-calendar';
import { HttpClientModule } from  '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TaskUpdateService} from './taskUpdate.service';

const appRoutes: Routes = [
  { path: 'next-task', component: DetailComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'task/:id',      component: DetailComponent },
  {
    path: 'heroes',
    component: DetailComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/next-task',
    pathMatch: 'full'
  },
  { path: '**', component: DetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,MyModel, DetailComponent, TaskListComponent, TaskDetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ScheduleModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }),

  ],
  providers: [TaskUpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
