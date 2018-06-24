import { Task } from './task'

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'task-detail',
  template: `
    <div *ngIf="task">
      <h2>{{task.title}} details</h2>
      <div><label>id: </label>{{task.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="task.title" placeholder="title"/>
  <!--input type="text"
  [(ngModel)]="task.title"
  [minDate]="minDate"
  [maxDate]="maxDate"
  #dp="bsDatepicker"
  bsDatepicker [(bsValue)]="newVar"
        value="{{ newVar | date:'yyyy-MM-dd' }}"/-->
           <!--span class="btn btn-success" (click)="dp.toggle()" class="glyphicon glyphicon-calendar"></span-->
           <p-calendar [(ngModel)]="task.start" dateFormat="yy-mm-dd" showTime="true" hourFormat="24"></p-calendar>
           <p-calendar [(ngModel)]="task.end" dateFormat="yy-mm-dd" showTime="true" hourFormat="24"></p-calendar>           
      </div>
    </div>
  `
})
export class TaskDetailComponent  implements OnInit  {
    @Input() task: Task;
    newVar : Date;
    
      ngOnInit() {
        this.newVar = new Date();
        console.log(this.newVar);
      }
}
