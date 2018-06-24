import { Injectable, Output, EventEmitter } from '@angular/core';
import {TaskService} from './tasks.service';
import {Task} from './task';
import { Subject }    from 'rxjs';

@Injectable()
export class TaskUpdateService {

  @Output() emiter: EventEmitter<Task[]> = new EventEmitter();
  private refresh = new Subject<Task[]>();
  refreshAnnounced$ = this.refresh.asObservable();
  
  updateList(tasks : Task[]) {
    console.log('Emit Event');  
    //this.refresh.next(tasks);  
    this.emiter.emit(tasks);
  }

}