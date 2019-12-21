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

export class ColisData{
  data: any;
  //  Url= "http://bdd.easy-carpool.com/";
  Url = "http://localhost:8080/";
  colisServiceUrl = this.Url +"colis";
  colisOnlyServiceUrl = this.Url +"colisonly";


  constructor(public http: HttpClient){}

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
