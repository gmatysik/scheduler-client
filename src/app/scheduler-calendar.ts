import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import { TaskService } from './tasks.service';
import { TaskUpdateService} from './taskUpdate.service';
import { Subscription }   from 'rxjs';
import { Task }   from './task';
import { environment } from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Component({
  selector: 'scheduler-calendar',
  templateUrl: './scheduler-calendar.html',
  providers: [TaskService]
})
export class MyModel {
    selectedTask : Task;
    //private tasksUrl = 'http://192.168.99.100:8090/tasks';  // URL to web api
    private tasksUrl = environment.resourceServerUrl + '/tasks';  // URL to web api
    
    constructor(private taskService: TaskService, private taskUpdateService: TaskUpdateService) { 
    }
        
        isOpen = false;
        @Input() tasks: Task[];
  
  handleEventClick(e) {
    this.taskUpdateService.updateTask(e.calEvent.id);
}

  handleRefresh(agreed: Task[]) {
  }

    ngOnInit() {
    this.taskUpdateService.emiter.subscribe(
        tasks => {
            this.tasks = tasks;
        });        
    }        
}


