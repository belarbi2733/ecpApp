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
    //Sauve la position de l'utilisateur dans la DB
    positionSend(lat, long){
      this.id = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
      this.posApi.sendPosition(lat, long, this.id).subscribe((response)=>{
        console.log(response);
      });
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
      this.tournee.idCar =null;
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
