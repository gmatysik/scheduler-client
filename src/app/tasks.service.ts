import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import * as moment from 'moment';
import { Headers, Http, RequestOptions } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn:  'root'
})
export class TaskService{

  
private tasksUrl = 'http://localhost:8080/tasks';  // URL to web api
//private tasksUrl = 'api/tasks';  // URL to web api
private latestTaskUrl = 'http://localhost:8080/tasks/next/10';  // URL to web api
//private latestTaskUrl = 'api/tasks/11';  // URL to web api
private taskNoUrl = 'http://localhost:8080/tasks/task/';  // URL to web api

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

private headers = new Headers({'Content-Type': 'application/json'});

update(task: Task): Promise<Task> {
  var newFormDate = moment(task.start).format("YYYY-MM-DD hh:mm");
  console.log('newFormDate 2' + newFormDate);
  //task.start = this.convertUTCDateToLocalDate(new Date(task.start)).toISOString();
  const url = `${this.tasksUrl}/${task.id}`;
  return this.http
    .put(url, JSON.stringify({title: task.title, start: newFormDate, id: task.id}), httpOptions)
    .toPromise()
    .then(() => task)
    .catch(this.handleError);
}

create(title: string, start: string): Promise<Task> {
  var newDate = new Date(start);

  var newFormDate = moment(start).format("YYYY-MM-DD hh:mm");  
  

  return this.http
    .post(this.tasksUrl + '/task', JSON.stringify({title: title, start: newFormDate}), httpOptions)
    .toPromise()
    .then(res => res as Task)
    .catch(this.handleError);
}

convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;   
}

delete(id: number): Promise<void> {
  const url = `${this.tasksUrl}/${id}`;
  return this.http.delete(url,)
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
}


private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}


}