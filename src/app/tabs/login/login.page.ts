import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  login: UserOptions = { mail: '', password: '' };
  submitted=false;
  loginFailed: string;
  loginStatus: boolean;

  constructor(
    public userData: UserData,
    public router: Router
  ) { }

  ngOnInit(){
    this.loginStatus = this.userData.isLog;
  }

  onLogin(form: NgForm){
    this.submitted=true;
    if(form.valid){
      this.userData.login(this.login.mail);
      this.router.navigateByUrl('/tabs/trajet');
    }
  }

  onLoginBdd(){
    this.userData.LoginBdd(this.login).then((validationStatus: boolean)=>{
      this.onLoginfunc(validationStatus);
    }).catch(()=>{
      this.loginFailed = 'Erreur avec la DataBase';
    });
  }

  onLoginfunc(validationStatus: boolean){
    console.log('Validation: '+ validationStatus);
    switch(validationStatus){
      case true:{
        this.userData.loginfunc().then(()=>{
          this.loginStatus = this.userData.isLog;
          this.router.navigateByUrl('/tabs/trajet');
        }); break;
      }
      case false: {
        this.loginFailed = 'Id error';
        break;
      }
      default: {
        console.log('Nothing happend');
      }
    }
  }

}
