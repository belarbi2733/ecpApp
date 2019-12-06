import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {TourneeOptions} from '../interfaces/tournee-options';
import {TrajetOptions} from '../interfaces/trajet-options';
import {UserOptions} from '../interfaces/user-options';


@Injectable({
  providedIn: 'root'
})

export class TourneeData{
  data: any;
  tourneeServiceUrl = "http://localhost:8080/tournee";
  trajetOnlyServiceUrl = "http://localhost:8080/trajetOnly";
  IdCarServiceUrl = "http://localhost:8080/getIdCar";

  constructor(public http: HttpClient){}

  getTourneebdd(data: TourneeOptions){
    return new Promise((resolve, reject)=>{
      this.http.post(this.tourneeServiceUrl, data).subscribe(res=>{
        resolve(res);
      },
    err=>{
      console.log('Error occured: '+err);
      reject();
    });
  });
  }

  getTrajetOnlybdd(data: TrajetOptions){
    return new Promise((resolve, reject)=> {
      this.http.post(this.trajetOnlyServiceUrl, data).subscribe(res=>{
        resolve(res);
      },
    err => {
      console.log('Error occured: ' + err);
      reject();
    });
  });
  }

  getIdCarbdd(data: TrajetOptions){
    return new Promise((resolve, reject) => {
      this.http.post(this.IdCarServiceUrl, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.log('Error occured in getIdCar:' + err);
          reject();
        }
      );
    });
  }




}
