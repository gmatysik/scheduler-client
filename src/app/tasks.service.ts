import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import * as moment from 'moment';
import { environment } from '../environments/environment';

@Injectable({
  providedIn:  'root'
})
export class TaskService{

  
//private tasksUrl = 'http://192.168.99.100:8090/tasks';  // URL to web api
//private latestTaskUrl = 'http://192.168.99.100:8090/tasks/next/10';  // URL to web api
//private taskNoUrl = 'http://192.168.99.100:8090/tasks/task/';  // URL to web api
private tasksUrl = environment.resourceServerUrl + '/tasks';  // URL to web api
private latestTaskUrl = environment.resourceServerUrl + '/tasks/next/10';  // URL to web api
private taskNoUrl = environment.resourceServerUrl + '/tasks/task/';  // URL to web api

constructor(private http: HttpClient) { }

getTask(id: String): Promise<Task> {  
       return this.http.get(this.taskNoUrl + id)
                .toPromise()
                .then(response => response as Task)
                .catch(this.handleError);
}
  

  getTasks(): Promise<Task[]> {
return this.http.get(this.tasksUrl)
              .toPromise()
              .then(response => response as Task[])
              .catch(this.handleError);
    }

  getLatestTasks(): Promise<Task[]> {

     return this.http.get(this.latestTaskUrl)
              .toPromise()
              .then(response => response as Task[])
              .catch(this.handleError);
    }

update(task: Task): Promise<Task> {
  var startDate = task.start != null ? moment(task.start).format("YYYY-MM-DD HH:mm") : null;
  var endDate = task.end != null ? moment(task.end).format("YYYY-MM-DD HH:mm") : null;  
  console.log("start: " + task.start);
  console.log("start: " + startDate);
  const url = `${this.tasksUrl}/${task.id}`;
  return this.http
    .put(url, JSON.stringify({title: task.title, start: startDate, id: task.id, end:endDate, description: task.description }))
    .toPromise()
    .then(() => task);
}

create(task: Task): Promise<Task> {
  var startDate = task.start != null ? moment(task.start).format("YYYY-MM-DD HH:mm") : null;
  var endDate = task.end != null ? moment(task.end).format("YYYY-MM-DD HH:mm") : null;  
  return this.http
    .post(this.tasksUrl + '/task', JSON.stringify({title:task.title, start: startDate, end:endDate, description: task.description }))
    .toPromise()
    .then(res => res as Task);
}

delete(id: number): Promise<void> {
  const url = `${this.tasksUrl}/${id}`;
  return this.http.delete(url)
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
}


private handleError(error: any): Promise<any> {
  return Promise.reject(error.message || error);
}


}