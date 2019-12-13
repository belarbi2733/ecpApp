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
  colisServiceUrl = "http://localhost:8080/colis";


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
}
