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

  constructor( public http: HttpClient, public user: UserData) {}

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
        group.hide = false; //change to true
        day.shownSessions++;

//        group.sessions.forEach((session: any) => {
          // check if this session should show or not
  //        this.filterSession(session, queryWords, excludeTracks, segment);

    //      if (!session.hide) {
            // if this session is not hidden then this group should show
      //      group.hide = false;
        //    day.shownSessions++;
//      }
  //      });
      });

      return day;
    })
  );
}


}
