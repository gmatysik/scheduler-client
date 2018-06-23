import { Task } from './task'

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'task-detail',
  template: `
    <div *ngIf="task">
      <h2>{{task.name}} details</h2>
      <div><label>id: </label>{{task.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="task.name" placeholder="name"/>
  <input type="text"
  [(ngModel)]="task.deadline"
  [minDate]="minDate"
  [maxDate]="maxDate"
  #dp="bsDatepicker"
  bsDatepicker [(bsValue)]="newVar"
        value="{{ newVar | date:'yyyy-MM-dd' }}"/>
           <span class="btn btn-success" (click)="dp.toggle()" class="glyphicon glyphicon-calendar"></span>
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
