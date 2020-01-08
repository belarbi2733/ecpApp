import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {TourneeOptions} from '../interfaces/tournee-options';
import {TrajetOptions} from '../interfaces/trajet-options';


@Injectable({
  providedIn: 'root'
})

export class TourneeData{
  //  Url= "http://bdd.easy-carpool.com/";
  Url = "http://localhost:8080/";
  tourneeServiceUrl = this.Url+ "tournee";
  IdCarServiceUrl = this.Url+ "getIdCar";

  /**
  *@ignore
  */
  constructor(public http: HttpClient){}

  /**
  *Get informations obout a round of a driver
  *@param{TourneeOptions}data
  */
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

  /**
  *Get idCar to know if the user is a driver or not
  *@param{TrajetOptions}data
  */
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
