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
  ) {  }

  async ngOnInit() {
  this.checkLoginStatus();
  this.listenForLoginEvents();
}

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
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
    this.userData.logout().then(() => {
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
