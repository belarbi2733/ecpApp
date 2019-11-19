import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})

export class TrajetData {
  data: any;

  constructor( public http: HttpClient) {}

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/data.json')
    }
  }


  getTimeline(
  dayIndex: number,
  queryText = '',
  segment = 'all'
) {
  return this.load().pipe(
    map((data: any) => {
      const day = data.trajet[dayIndex];
      day.shownSessions = 0;

     queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

       day.groups.forEach((group: any) => {
         group.sessions.forEach((session:any)=>{
           session.hide;
           day.shownSessions++;
           console.log(day.shownSessions);
         });
         });
      return day;
    })
  );
}

getSteps(
  dayIndex: number,
  queryText = '',
  segment = 'all'
){
  return this.load().pipe(
    map((data:any) =>{
      const tour = data.trajet[dayIndex];
      tour.shownSteps =0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
       const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

       tour.groups.forEach((group: any) => {
             group.hide = false;
             group.sessions.forEach((session: any)=>{
               if(session.steps){
                 session.steps.forEach((step:any)=>{
                   tour.shownSteps++;
                   console.log("tour: " +tour.shownSteps);
                 });
               }
             });
         });
         return tour;
    })
  );
}


}
