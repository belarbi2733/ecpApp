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
  /**
  *@ignore
  */
  constructor( private http : HttpClient){  }

  /**
  *Function that is not usefull anymore
  *@ignore
  */
  getCode(){
    return this.http.get(this.codeServiceUrl);
  }

  /**
  *Get the code that is relative to a ride from the data base
  *@param{TrajetOptions}data
  */
  getCodebdd(data: TrajetOptions){
    return this.http.post(this.getCodeServiceUrl,data);
  }

  /**
  *Function that compare the code that is scan with the code relative to the ride from de the database
  *@param{TrajetOptions}data
  */
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

  /**
  *Compare login informations that the user types in with informations from the data base to confirm and log the user in
  *@param{UserOptions}data 
  */
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
