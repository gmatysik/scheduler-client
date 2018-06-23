import { Component } from '@angular/core';

@Component({
  selector: 'scheduler-calendar',
  templateUrl: './scheduler-calendar.html'
})
export class MyModel {

  events: any[];
  
      ngOnInit() {
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
          ];
      }
        
}