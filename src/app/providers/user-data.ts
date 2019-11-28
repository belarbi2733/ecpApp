import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {UserOptions} from '../interfaces/user-options';



@Injectable({
  providedIn: 'root'
})

export class UserData {
  _validatedTrajets: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  data: any;
  userIndex = 0;
  queryText = '';
  segment = 'all';
  userCheck= false;
  groups: any;
  checking: any;

  userServiceUrl= "http://localhost:8080/login";
  isLog = false;


  constructor(
    public events: Events,
    public storage: Storage,
    public http: HttpClient ){}

    load(): any {
      if (this.data) {
        return of(this.data);
      } else {

        return this.http
          .get('assets/data/dataUser.json')
      }
    }

    getInfo(
      userIndex: number,
      queryText = '',
      segment = 'all'
    ){
      return this.load().pipe(
        map((data: any)=> {

          const user = data.users[userIndex];
          user.shownSessions = 0;

          queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
           const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

          user.groups.forEach((group: any) => {
            group.sessions.forEach((session: any)=>{
              session.hide=false;
              user.shownSessions++;

            });

          });
          return user;
        })
      );
    }

  /*  checkDataName(userLogin : string): boolean {

        this.getInfo(this.userIndex , this.queryText, this.segment).subscribe((data:any)=>{
          this.groups = data.groups;
          data.groups.forEach((group: any) => {
            group.sessions.forEach((session: any)=>{
              if(session.userName === userLogin){
                console.log(session.userName);
                this.userCheck=true;
              }
            });
          });
        });return this.userCheck;

    }*/

  login(mail: string): Promise<any> {
  //  this.checking=this.checkDataName(mail);
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
    this.setUsername(mail);
    return this.events.publish('user:login');
    console.log("logged in");

    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      this.events.publish('user:logout');
    });
  }

  setUsername(mail: string): Promise<any> {
        return this.storage.set('mail', mail);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  hasValidate(sessionId: string): boolean {
  return (this._validatedTrajets.indexOf(sessionId) > -1);
  }

  addValidation(sessionId: string): void {
    this._validatedTrajets.push(sessionId);
  }

  LoginBdd(data: UserOptions){
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

  loginfunc(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        this.isLog =true;
        resolve(true);
      }, 0);
    });
  }


}
