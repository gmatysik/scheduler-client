import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import { TaskService } from './tasks.service';
import { TaskUpdateService} from './taskUpdate.service';
import { Subscription }   from 'rxjs';
import { Task }   from './task';

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
    
    private tasksUrl = 'http://localhost:8080/tasks';  // URL to web api

    constructor(private taskService: TaskService, private taskUpdateService: TaskUpdateService) { 
    }
        
        isOpen = false;
  events: any[];
  
  handleEventClick(e) {
    console.log('handleEvent: ' + e.calEvent.start.format().replace('T',' ').slice(0,-3));
    console.log('handleEvent: ' + e.calEvent.id);
    
    this.taskUpdateService.updateTask(e.calEvent.id);

    //this.selectedTask = e.calEvent;
    //this.selectedTask.start = e.calEvent.start.format().replace('T',' ').slice(0,-3);
    //e.calEvent = Selected event
    //e.jsEvent = Browser click event
    //e.view = Current view object
}

  handleRefresh(agreed: Task[]) {
    console.log('handleRefresh');
  }

    ngOnInit() {
    this.taskService.getTasks().then(events => {this.events = events;});
    this.taskUpdateService.emiter.subscribe(
        tasks => {
            console.log("Refreshing" + tasks);
            this.events = tasks;
        });        
    }        
}




/*
          this.events = [
              {
                  "title": "All Day Event",
                  "start": "2018-06-22T16:00:00",
                  "end": "2018-06-22T22:00:00",
                  "description":"sssss"
              },
              {
                  "title": "Long Event",
                  "start": "2016-01-07",
                  "end": "2016-02-10"
              },
              {
                  "title": "Repeating Event",
                  "start": "2016-01-09T16:00:00"
              },
              {
                  "title": "Repeating Event",
                  "start": "2016-01-16T16:00:00"
              },
              {
                  "title": "Conference",
                  "start": "2016-01-11",
                  "end": "2016-01-13"
              }
          ];*/
  