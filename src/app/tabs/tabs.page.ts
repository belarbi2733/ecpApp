import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, Platform,  ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { UserData } from '../providers/user-data';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  loggedIn = false;
  constructor(
    private events: Events,
    private userData: UserData,
    private storage: Storage,
    private router: Router,
    public toastController: ToastController
  ) {
   }

  ngOnInit() {

      if (localStorage.length === 0) { // Si le localStorage est vide, le remplir avec les valeurs par défaut
        console.log('Défaut');
        const isLogJson = {isLog: false};
        localStorage.setItem('isLog', JSON.stringify(isLogJson)); // Stockage de is Log par défaut dans localstorage

        const idJson = {id: -1};
        localStorage.setItem('idUser', JSON.stringify(idJson)); // Stockage de idUser par défaut dans localstorage
      }
      console.log(localStorage);

  this.checkLoginStatus();
  this.listenForLoginEvents();
}

  checkLoginStatus() {
  //  return this.userData.isLoggedIn().then(loggedIn => {
  //    return this.updateLoggedInStatus(loggedIn);
      this.loggedIn = this.userData.isLog;
      console.log("loggedIn: "+ this.loggedIn)
      return this.loggedIn;

      //= JSON.parse(localStorage.getItem('isLog')).isLog; // Loading loginstatus in localStorage
    //});
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);

  }

  listenForLoginEvents() {
    
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });
    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });

  }

  logout() {
   this.userData.logoutfunc().then(() => {
      return this.loggedIn= this.userData.isLog;
      return this.router.navigateByUrl('/tabs/login');
    });
  }

  async toast() {
    const toast = await this.toastController.create({
      message: 'Vous devez vous connecter',
      duration: 2000,
      buttons: [{
          text: 'ok',
          role: 'cancel',
          handler: () => {
            this.toastController.dismiss()
          }
        }]
    });
    toast.present();
  }

}
