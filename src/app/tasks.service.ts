import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient} from  '@angular/common/http';
//import 'rxjs/add/operator/toPromise';

//import { TASKS } from './mock-tasks';
import { Headers, Http, RequestOptions } from '@angular/http';


@Injectable({
  providedIn:  'root'
})
export class TaskService{

private tasksUrl = 'http://localhost:8080/tasks';  // URL to web api
//private tasksUrl = 'api/tasks';  // URL to web api
private latestTaskUrl = 'http://localhost:8080/tasks/task/1';  // URL to web api
//private latestTaskUrl = 'api/tasks/11';  // URL to web api

constructor(private http: HttpClient) { }

    getTasks(): Promise<Task[]> {

     return this.http.get(this.tasksUrl)
              .toPromise()
              .then(response => response as Task[])
              .catch(this.handleError);

//       return new Promise(resolve => {
//     Simulate server latency with 2 second delay
  //  setTimeout(() => resolve(TASKS), 2000);
  //});
    }

    getLatestTasks(): Promise<Task> {
//return Promise.resolve(TASKS);

     return this.http.get(this.latestTaskUrl)
              .toPromise()
              .then(response => response as Task)
              .catch(this.handleError);
       //return new Promise(resolve => {
    // Simulate server latency with 2 second delay
    //setTimeout(() => resolve(TASKS), 2000);
  //});*/
    }

private headers = new Headers({'Content-Type': 'application/json'});

update(task: Task): Promise<Task> {
  const url = `${this.tasksUrl}/${task.id}`;
  return this.http
    .put(url, JSON.stringify(task))
    .toPromise()
    .then(() => task)
    .catch(this.handleError);
}

create(name: string, deadline: string): Promise<Task> {
  console.log('create ' + name);
  console.log('url ' + this.tasksUrl);

  return this.http
    .post(this.tasksUrl + '/task', JSON.stringify({name: name, deadline: deadline}))
    .toPromise()
    .then(res => res as Task)
    .catch(this.handleError);
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

   //getTasks(): Promise<Task[]> {
     //return Promise.resolve(TASKS);        
    //}

    //    getTasks(): Task[] {
      //  return TASKS;
    //}

}