import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';

/**
*Login page
*/
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  
  login: UserOptions = { mail: '', password: ''};
  submitted=false;
  loginFailed: string;
  loginStatus: boolean;

/**
*Check login status on initialisation
*/
  constructor(
    public userData: UserData,
    public router: Router
  ) {
    this.loginStatus = this.userData.isLog;
 }

/**
*@ignore
*/
  ngOnInit(){
    console.log("login status: " + this.loginStatus);
  }

/**
*Check form submitted before login with [onLoginBdd]{@link LoginPage.html#onLoginBdd}
*@param {NgForm} form
*/
  onLogin(form: NgForm){
    this.submitted=true;
    if(form.valid){
      this.onLoginBdd();
    }
  }


/**
*Login with [LoginBdd]{@link ../injectables/UserData.html#LoginBdd}
*
*Call [onLoginfunc]{@link LoginPage.html#onLoginfunc}
*
*If Login success call [getIdForLocalStorage]{@link ../injectables/UserData.html#getIdForLocalStorage} and store idUser in localStorage
*/
  onLoginBdd(){
    this.userData.LoginBdd(this.login).then((validationStatus: boolean)=>{
      this.onLoginfunc(validationStatus);
      if (validationStatus) {  // Si l'authentification est vérifiée
          // On sauvegarde l'idUser en variable de session avec localStorage
          this.userData.getIdForLocalStorage(this.login).then((idUser: number) => {
            const idJson = {id: idUser};
            localStorage.setItem('idUser', JSON.stringify(idJson));
            this.router.navigateByUrl('/tabs/trajet');
          })
            .catch(() => {
              console.log('Error in getIdForLocalStorage');
            });
        }
    }).catch(()=>{
      this.loginFailed = 'Erreur avec la DataBase';
    });
  }

/**
*If Login success, change login status of the user with [loginfunc]{@link ../injectables/UserData.html#loginfunc}
*@param {boolean} validationStatus
*/
  onLoginfunc(validationStatus: boolean){
    switch(validationStatus){
      case true:{
        this.userData.loginfunc().then(()=>{
          this.loginStatus = this.userData.isLog;
          console.log("login status: " + this.loginStatus);
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
