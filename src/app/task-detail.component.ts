import { Task } from './task'
import { TaskUpdateService} from './taskUpdate.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'task-detail',
  template: `
    <div *ngIf="task">
      <h2>{{task.title}} details</h2>
      <div><label>id: </label>{{task.id}}</div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="name" [(ngModel)]="task.title" placeholder="title" class="form-control"/>
      </div>
  <!--input type="text"
  [(ngModel)]="task.title"
  [minDate]="minDate"
  [maxDate]="maxDate"
  #dp="bsDatepicker"
  bsDatepicker [(bsValue)]="newVar"
        value="{{ newVar | date:'yyyy-MM-dd' }}"/-->
           <!--span class="btn btn-success" (click)="dp.toggle()" class="glyphicon glyphicon-calendar"></span-->
           <div class="form-group">
            <label for="start">Start time:</label>
            
            <p-calendar type="start" [(ngModel)]="task.start" dateFormat="yy-mm-dd" [showTime]="true" hourFormat="24" class="form-control"></p-calendar>
           </div>
           
           <div class="form-group">
            <label for="end">End time:</label>           
            <p-calendar type="end" [(ngModel)]="task.end" dateFormat="yy-mm-dd" [showTime]="true" hourFormat="24" class="form-control"></p-calendar>           
           </div>
          <div class="form-group">
           <label for="name">Description:</label>
           <input type="name" [(ngModel)]="task.description" placeholder="description" class="form-control"/>
         </div>              
    </div>
  `
})
export class TaskDetailComponent  implements OnInit  {
    @Input() task: Task;
    newVar : Date;
    
    constructor(private taskUpdateService: TaskUpdateService) { 
    }
      ngOnInit() {
        this.newVar = new Date();
      }
}
