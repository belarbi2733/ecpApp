import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {TrajetOptions} from '../interfaces/trajet-options';


@Injectable({
  providedIn: 'root'
})

export class ColisData{
  data: any;
  //  Url= "http://bdd.easy-carpool.com/";
  Url = "http://localhost:8080/";
  colisServiceUrl = this.Url +"colis";
  colisOnlyServiceUrl = this.Url +"colisonly";

  /**
  *@ignore
  */
  constructor(public http: HttpClient){}

  /**
  *Get package informations from the data base
  *@param{TrajetOptions}data
  */
  getColisbdd(data: TrajetOptions){
    return new Promise((resolve, reject)=>{
      this.http.post(this.colisServiceUrl, data).subscribe(res=>{
        resolve(res);
      },
    err=>{
      console.log('Error occured: '+err);
      reject();
    });
  });
  }

  /**
  * Get informations about the transfer of a package of a user that do not travel with his package
  *@param{TrajetOptions}data
  */
  getColisOnlybdd(data: TrajetOptions){
    return new Promise((resolve, reject)=>{
      this.http.post(this.colisOnlyServiceUrl, data).subscribe(res=>{
        resolve(res);
      },
    err=>{
      console.log('Error occured: '+err);
      reject();
    });
  });
  }
}
