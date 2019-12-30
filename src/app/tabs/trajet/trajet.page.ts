import {  ViewChild, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Events, AlertController, IonList, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { TrajetData } from '../../providers/trajet-data';
import { TourneeData } from '../../providers/tournee-data';
import { TrajetOptions } from '../../interfaces/trajet-options';
import { TourneeOptions } from '../../interfaces/tournee-options';
import { ColisData } from '../../providers/colis-data';

/**
*List of rides or round
*/
@Component({
  selector: 'app-trajets',
  templateUrl: 'trajet.page.html',
  styleUrls: ['trajet.page.scss']
})

export class TrajetPage {
  @ViewChild('trajetList', { static: true }) trajetList: IonList;

  shownSessions: any = 0;
  groups: any = [];
  bddTraj: any=[];
  Colis: any=[];
  bddTour: any=[];
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  trajet: TrajetOptions = {idUser: null,idColis: null,idTour: null, depart: '', arrivee: '', date: '', id: null, code: null};
  tournee: TourneeOptions=  { idUser: null,idCar: null, depart: '', arrivee: '', date: '', id: null};
  idCar= false;
  tourneeList: any=[];
  heure_arrivee= null;

  /**
  *Get user id from localStorage
  */
  constructor(
    private events: Events,
    public router: Router,
    public user: UserData,
    public config: Config,
    public trajData: TrajetData,
    public tourData: TourneeData,
    public colisData: ColisData,
    public toastController: ToastController
  ) {
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
  }

  /**
  *Call functions that are usefull
  *[toast]{@link TrajetPage.html#toast},
  *[getIdCar]{@link TrajetPage.html#getIdCar},
  *[updateTrajet]{@link TrajetPage.html#updateTrajet},
  *[listenForLoginEvents]{@link TrajetPage.html#listenForLoginEvents}
  */
  ngOnInit() {
    this.toast();
    setTimeout(() => {
      this.getIdCar();
      setTimeout(()=>{
        this.updateTrajet();
      }, 300);
    }, 300);
    this.listenForLoginEvents();
  }

  /**
  *Toast to alert user to give his advice
  */
  async toast() {
    const toast = await this.toastController.create({
      message: 'Donnez votre avis sur vos trajets sous 24h',
      duration: 3000,
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

/**
*Listen to events, if user is log call [getIdCar]{@link TrajetPage.html#getIdCar} and [updateTrajet]{@link TrajetPage.html#updateTrajet}
*/
  listenForLoginEvents(){
    this.events.subscribe('user:login', ()=>{
      setTimeout(() => {
        this.getIdCar();
        setTimeout(()=>{
          this.updateTrajet();
        }, 300);
      }, 300);
    });
  }

/**
*Get idCar to know if user is a driver or a traveller
*
*Call [getIdCarbdd]{@link ../injectables/TourneeData.html#getIdCarbdd}
*/
  getIdCar(){
    this.tournee.idCar =null;
    this.idCar=false;

    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id;
    console.log(this.trajet.idUser);

    this.tourData.getIdCarbdd(this.trajet).then((response)=>{
      if(response != null){
        this.idCar=true;
        let respo= JSON.stringify(response);
        let resp = parseInt(respo);
        this.tournee.idCar =resp;
      }
    }).catch(() => {
      console.log('Error in getIdCar');
    });
  }

  /**
  *Update rides list
  *
  *If driver, get [TourneeBdd]{@link TrajetPage.html#TourneeBdd}
  *
  *If traveller, get [TrajetBdd]{@link TrajetPage.html#TrajetBdd}
  */
  updateTrajet(){
    this.bddTraj = [];
    this.bddTour = [];
    if (this.idCar === false){
      setTimeout(()=>{
        this.TrajetBdd();
        this.getColisOnly();
      }, 200);
    }else {
      if(this.idCar === true){
        this.TourneeBdd();
      }
    }
  }

  /**
  *Get rides from database [getTrajetbdd]{@link ../injectables/TrajetData.html#getTrajetbdd} to display them in a list
  */
  TrajetBdd(){
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage

    this.trajData.getTrajetbdd(this.trajet).then((response)=>{
      console.log('get: ', response);
      this.bddTraj = response;

      this.bddTraj.forEach((BddTraj: any)=>{
        this.shownSessions++;
        this.trajet.idTour = BddTraj.id_tournee;
        console.log(BddTraj.date);
        BddTraj.date = this.Date(BddTraj.date)
        console.log("DATE "+BddTraj.date)
      });
    });
  }


  /**
  *Get round from database [getTourneebdd]{@link ../injectables/TourneeData.html#getTourneebdd} to display them on a list
  */
  TourneeBdd(){
    this.tournee.idUser = JSON.parse(localStorage.getItem('idUser')).id;

    this.tourData.getTourneebdd(this.tournee).then((response)=>{
      console.log('get: ', response);
      this.bddTour= response;
      this.bddTour.forEach((BddTour: any)=>{
        this.shownSessions++;
        console.log(BddTour.date);
        BddTour.date = this.Date(BddTour.date)
        console.log("DATE "+BddTour.date)
        BddTour.hide;
      });
    });
  }

/**
*Get package of a traveller from database [getColisOnlybdd]{@link ../injectables/ColisData.html#getColisOnlybdd} to display them on a list
*/
  getColisOnly(){
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
    console.log(this.trajet.idUser);
    this.colisData.getColisOnlybdd(this.trajet).then((response)=>{
      console.log(response)
      this.Colis= response;
      this.Colis.forEach((colis: any)=> {
        console.log(colis.date);
        colis.date = this.Date(colis.date)
        console.log("DATE "+colis.date)
        colis.hide;
      });
    });
  }

/**
*Transform sql date type to js date type
*@param {string} sqlDate
*/
  Date(sqlDate){
    var sqlDateArr1  = sqlDate.split("-");
    var year =  sqlDateArr1 [0];
    var month = (sqlDateArr1 [1]).toString();
    var sqlDateArr2 = sqlDateArr1[2].split("T");
    var day = sqlDateArr2[0];
    return day+'/'+month+'/'+year;
  }

}
