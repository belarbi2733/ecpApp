import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, Platform,  ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserData } from '../providers/user-data';
import { TourneeOptions } from '../interfaces/tournee-options';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PositionService } from '../providers/position';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  loggedIn = false;
  tournee: TourneeOptions=  { idUser: null,idCar: null, depart: '', arrivee: '', date: '', id: null};
  id: number;
  locTab:String[]= [];

/**
*@ignore
*/
  constructor(
    private events: Events,
    private userData: UserData,
    private storage: Storage,
    private router: Router,
    public toastController: ToastController,
    private geolocation: Geolocation,
    private posApi:PositionService
  ) {
   }

  /**
  *Initialise les valeurs du localstorage
  *then [checkLoginStatus]{@link TabsPage.html#checkLoginStatus}
  *and [listenForLoginEvents]{@link TabsPage.html#listenForLoginEvents}
  *
  *When the user is log, the app watch his location [watch]{@link TabsPage.html#watch}
  */
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
  if(this.loggedIn){
    this.watch();
  }
}

/**
*Function that watch frequently the location of the user's device
*
*It save the location into the data base with [positionSend]{@link TabsPage.html#positionSend}
*/
  watch(){
    const watch = this.geolocation.watchPosition({enableHighAccuracy : true, timeout : 1000}).subscribe(position =>{
      if(position.coords !== undefined){
        let locationString = position.coords.longitude + '\t'+ position.coords.latitude;
        this.locTab.push(locationString);
        console.log(locationString);
        this.positionSend(position.coords.latitude, position.coords.longitude);

      }else{
        console.log(position); //Afficher l'erreur
        throw "Impossible de récupérer la position.";
      }
    });
  }

  /**
  *Save location of the user in data base [sendPosition]{@link ../injectables/PositionService.html#sendPosition}
  */
    positionSend(lat, long){
      this.id = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
      this.posApi.sendPosition(lat, long, this.id).subscribe((response)=>{
        console.log(response);
      });
    }

    /**
    *Function that check if a user is log yet or not with [isLog]{@link ../injectables/UserData.html#isLog}
    */
  checkLoginStatus() {
      this.loggedIn = this.userData.isLog;
      console.log("loggedIn: "+ this.loggedIn)
      return this.loggedIn;
  }

  /**
  *update the login status of the user
  *@param{boolean}loggedIn
  */
  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);

  }

  /**
  *Listen to events if user log in or out
  *to update the status [updateLoggedInStatus]{@link TabsPage.html#updateLoggedInStatus}
  */
  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });
    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });

  }

/**
*Function that log out the user [logoutfunc]{@link ../injectables/UserData.html#logoutfunc}
*/
  logout() {
   this.userData.logoutfunc().then(() => {
      return this.loggedIn= this.userData.isLog;
      this.tournee.idCar =null;
      return this.router.navigateByUrl('/tabs/login');
    });
  }

  /**
  *Toast to alert the user that he has to login before accessing any other pages
  */
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
