import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {UserOptions} from '../interfaces/user-options';
@Injectable({
  providedIn: 'root'
})

export class ServiceData{
  codeServiceUrl= "http://localhost:8080/code";
  userServiceUrl= "http://localhost:8080/login";

  constructor( private http : HttpClient){  }

  getCode(){
    return this.http.get(this.codeServiceUrl);
  }

  loginDbb(data: UserOptions){
    return new Promise((resolve, reject)=>{
        this.http.post(this. userServiceUrl, data).subscribe(res=>{
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
