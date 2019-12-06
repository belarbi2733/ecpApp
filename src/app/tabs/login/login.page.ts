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

  login: UserOptions = { mail: '', password: ''};
  submitted=false;
  loginFailed: string;
  loginStatus: boolean;

  constructor(
    public userData: UserData,
    public router: Router
  ) {
    this.loginStatus = this.userData.isLog;
 }

  ngOnInit(){
    console.log("login status: " + this.loginStatus);
  }

  onLogin(form: NgForm){
    this.submitted=true;
    if(form.valid){
      this.onLoginBdd();
    //  this.userData.login(this.login.mail);
    //  this.router.navigateByUrl('/tabs/trajet');
    }
  }

  onLoginBdd(){
    this.userData.LoginBdd(this.login).then((validationStatus: boolean)=>{
      this.onLoginfunc(validationStatus);
      if (validationStatus) {  // Si l'authentification est vérifiée
          // On sauvegarde l'idUser en variable de session avec localStorage
          this.userData.getIdForLocalStorage(this.login).then((idUser: number) => {
            console.log('idUser : ' + idUser);
            const idJson = {id: idUser};
            localStorage.setItem('idUser', JSON.stringify(idJson));
            console.log(localStorage);
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

  onLoginfunc(validationStatus: boolean){
    console.log('Validation: '+ validationStatus);
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
