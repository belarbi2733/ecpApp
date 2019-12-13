import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {TrajetOptions} from '../interfaces/trajet-options';
import { HttpModule } from '@angular/http';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})

export class TrajetData {
  data: any;
  trajetServiceUrl = "http://localhost:8080/trajet";
  trajetIdColisServiceUrl = "http://localhost:8080/getIdColis";
  tourneeIdServiceUrl = "http://localhost:8080/getTourneeId";
  trajAllServiceUrl = "http://localhost:8080/trajetAll";
  getCodeServiceUrl = "http://localhost:8080/getCode";
  trajConductServiceUrl = "http://localhost:8080/trajetConduct";


  constructor( public http: HttpClient) {}

  getCodebdd(data: TrajetOptions){
    return this.http.post(this.getCodeServiceUrl, data);
  }

  getTrajetbdd(data: TrajetOptions){
    return new Promise((resolve, reject)=> {
      this.http.post(this.trajetServiceUrl, data).subscribe(res=>{
        resolve(res);
      },
    err => {
      console.log('Error occured: ' + err);
      reject();
    });
  });
  }

  getIdColisbdd(data: TrajetOptions){
    return new Promise((resolve, reject) => {
      this.http.post(this.trajetIdColisServiceUrl, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.log('Error occured in getIdColis:' + err);
          reject();
        }
      );
    });
  }


    getTrajetAllbdd(data: TrajetOptions){
      return new Promise((resolve, reject)=> {
        this.http.post(this.trajAllServiceUrl, data).subscribe(res=>{
          resolve(res);
        },
      err => {
        console.log('Error occured: ' + err);
        reject();
      });
    });
    }

    getTrajetConductbdd(data: TrajetOptions){
      return new Promise((resolve, reject)=> {
        this.http.post(this.trajConductServiceUrl, data).subscribe(res=>{
          resolve(res);
        },
      err => {
        console.log('Error occured: ' + err);
        reject();
      });
    });
    }

  getIdTourneebdd(data: TrajetOptions){
    return new Promise((resolve, reject) => {
      this.http.post(this.tourneeIdServiceUrl, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.log('Error occured in getIdTournee:' + err);
          reject();
        }
      );
    });
  }


/*
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
*/

/*
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
*/



}
