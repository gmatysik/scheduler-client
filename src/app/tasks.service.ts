import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import * as moment from 'moment';
//import { Headers, Http, RequestOptions } from '@angular/http';//TODO: deprecated

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn:  'root'
})
export class TaskService{

  
private tasksUrl = 'http://localhost:8080/tasks';  // URL to web api
private latestTaskUrl = 'http://localhost:8080/tasks/next/10';  // URL to web api
private taskNoUrl = 'http://localhost:8080/tasks/task/';  // URL to web api

constructor(private http: HttpClient) { }

getTask(id: String): Promise<Task> {  
       return this.http.get(this.taskNoUrl + id, httpOptions)
                .toPromise()
                .then(response => response as Task)
                .catch(this.handleError);
}
  

  getTasks(): Promise<Task[]> {
/*
let headers = new HttpHeaders();
headers = headers.append('Authorization','Basic ' + sessionStorage.getItem('token'));
headers = headers.append('Content-Type','application/json');

console.log('Auth: ' + headers.get('Authorization'));
console.log('Content-Type: ' + headers.get('Content-Type'));
*/
//return this.http.get(this.tasksUrl, {headers})
return this.http.get(this.tasksUrl)
              .toPromise()
              .then(response => response as Task[])
              .catch(this.handleError);
    }

  getLatestTasks(): Promise<Task[]> {

     return this.http.get(this.latestTaskUrl, httpOptions)
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
    .put(url, JSON.stringify({title: task.title, start: startDate, id: task.id, end:endDate, description: task.description }), httpOptions)
    .toPromise()
    .then(() => task);
}

create(task: Task): Promise<Task> {
  var startDate = task.start != null ? moment(task.start).format("YYYY-MM-DD HH:mm") : null;
  var endDate = task.end != null ? moment(task.end).format("YYYY-MM-DD HH:mm") : null;  
  return this.http
    .post(this.tasksUrl + '/task', JSON.stringify({title:task.title, start: startDate, end:endDate, description: task.description }), httpOptions)
    .toPromise()
    .then(res => res as Task);
}

delete(id: number): Promise<void> {
  const url = `${this.tasksUrl}/${id}`;
  return this.http.delete(url,httpOptions)
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
}


private handleError(error: any): Promise<any> {
  return Promise.reject(error.message || error);
}


}