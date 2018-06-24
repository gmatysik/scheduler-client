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
    subscription: Subscription;

    private tasksUrl = 'http://localhost:8080/tasks';  // URL to web api

    constructor(private taskService: TaskService, private taskUpdateService: TaskUpdateService) { 
        this.subscription = taskUpdateService.refreshAnnounced$.subscribe(
            tasks => {
                console.log("Refresche" + tasks);
                this.events = tasks;
          });        
        
        }
        
        isOpen = false;
  events: any[];
  
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
      }
        
}