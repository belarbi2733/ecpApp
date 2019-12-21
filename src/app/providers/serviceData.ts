import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {UserOptions} from '../interfaces/user-options';
import {TrajetOptions} from '../interfaces/trajet-options';

@Injectable({
  providedIn: 'root'
})

export class ServiceData{
  //  Url= "http://bdd.easy-carpool.com/";
  Url = "http://localhost:8080/";
  codeServiceUrl= this.Url + "code";
  userServiceUrl= this.Url + "login";
  getCodeServiceUrl = this.Url + "getCode";
  checkCodeServiceUrl = this.Url + "checkCode";

  constructor( private http : HttpClient){  }

  getCode(){
    return this.http.get(this.codeServiceUrl);
  }

  getCodebdd(data: TrajetOptions){
    return this.http.post(this.getCodeServiceUrl,data);
  }

  checkCodebdd(data: TrajetOptions){
    return new Promise((resolve, reject)=>{
        this.http.post(this.checkCodeServiceUrl, data).subscribe(res=>{
          console.log('CheckCode: '+res);
          if(res === true){
            console.log('checkin success');
          }
          else{
            if(res===false){
              console.log('checkin Failed ! ');
            }
          }
          resolve(res);
        },
      err=> {
        console.log('Error occured: '+err);
        reject();
      });
    });
  }

  loginDbb(data: UserOptions){
    return new Promise((resolve, reject)=>{
        this.http.post(this.userServiceUrl, data).subscribe(res=>{
          console.log('login: '+res);
          if(res === true){
            console.log('login success');
          }
          else{
            if(res===false){
              console.log('login Failed ! ');
            }
          }
          resolve(res);
        },
      err=> {
        console.log('Error occured: '+err);
        reject();
      });
    });
  }
}
