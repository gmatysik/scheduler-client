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
import {LoginComponent} from './login.component';
import {LoginAppComponent} from './login-app.component';
import {LogoutComponent} from './auth/logout.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { HeaderInterceptor } from './auth/security.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {TaskDialogComponent as TaskDialogComponent} from './task/task-dialog.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';

const appRoutes: Routes = [
  { path: 'login-app', component: LoginAppComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuard] },
  { path: 'next-task', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'task/:id',  component: DetailComponent, canActivate: [AuthGuard] },
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
    AppComponent, MyModel, DetailComponent, TaskListComponent, 
    TaskDetailComponent, LoginComponent, LogoutComponent, LoginAppComponent,
    TaskDialogComponent
  ],
  imports: [
    RouterModule,
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
      MatButtonModule,
    MatDialogModule

  ],
  providers: [TaskUpdateService, AuthGuard, AuthService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true // Add this line when using multiple interceptors.
    }],
  bootstrap: [AppComponent],
  entryComponents: [TaskDialogComponent]
})
export class AppModule { }
