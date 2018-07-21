import { Component } from '@angular/core';
import { TaskService } from './tasks.service';
import { Task } from './task';
import { TaskListComponent } from './taskList.component';
import { TaskUpdateService } from './taskUpdate.service';



@Component({
  selector: 'my-details',
  template: `

  <div>
  <button (click)="newTask()">New task</button>
</div>


<div class="row">
  <div class="col-sm-4">
      <task-detail [task] = "selectedTask"></task-detail>
      <div *ngIf="selectedTask">
        <button (click)="save()">Save</button>
      </div>
  </div>
  <div class="col-sm-8">
  <div *ngIf="tasks">
      <scheduler-calendar [tasks]="tasks" (refresh)="handleRefresh($event)"></scheduler-calendar>
      </div>      
  </div>
</div>
  `,
  providers: [TaskService]
})
export class DetailComponent  { 
  isDataAvailable:boolean = false;
   tasks : Task[];
   selectedTask : Task;

  ngOnInit(): void {
    this.taskService.getTasks().then(events => {
      this.tasks = events;
    });


      
    this.taskUpdateService.taskRefreshEmiter.subscribe(
      id => {
          this.taskService.getTask(id).then(task => this.selectedTask  = task);
      });        

  }

  onSelect(task : Task){
    this.selectedTask = this.tasks[0];
  }

  save(): void {   
    if(this.selectedTask.id != null){
      console.log('date before ' + this.selectedTask.start);
        this.taskService.update(this.selectedTask).then(
          task => {
            this.taskService.getTasks().then(events => {
              this.tasks = events;
              this.selectedTask = null;
              this.taskUpdateService.updateList(this.tasks);
            });        
          }
        );
    } else {
        this.add(this.selectedTask);
    }
  }    


  add(task: Task): void {
    this.taskService.create(task.title, task.start)
      .then(task => {
        this.tasks.push(task);
        this.selectedTask = null;
        this.taskUpdateService.updateList(this.tasks);              
      }).catch((e) => {console.log(e)});
  }


  newTask(): void{
    this.selectedTask = new Task();
  }

  constructor(private taskService: TaskService, private taskUpdateService: TaskUpdateService) { 
  }

}
