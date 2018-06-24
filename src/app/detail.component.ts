import { Component } from '@angular/core';
import { TaskService } from './tasks.service';
import { Task } from './task';
import { TaskListComponent } from './taskList.component';

@Component({
  selector: 'my-details',
  template: `
<h1>Next task:</h1>
<div *ngIf="selectedTask">
  <div>
    Id: <span> {{selectedTask.id}} </span>
  </div>
  <div>
    Name: <span> {{selectedTask.title}} </span>
  </div>
  <div>
    Start: <span> {{selectedTask.start}} </span>
  </div>
</div>
  `,
  providers: [TaskService]
})
export class DetailComponent  { 

   tasks : Task[];
   selectedTask : Task;

  getLatestTask(): void {
    this.taskService.getLatestTasks().then(task => this.selectedTask = task);
  }

  ngOnInit(): void {
    this.getLatestTask();
  }

    onSelect(task : Task){
    this.selectedTask = this.tasks[0];
  }


  constructor(private taskService: TaskService) { 

}

}
