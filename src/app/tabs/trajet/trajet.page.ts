import {  ViewChild, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Events, AlertController, IonList, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { TrajetData } from '../../providers/trajet-data';
import { TourneeData } from '../../providers/tournee-data';
import { TrajetOptions } from '../../interfaces/trajet-options';
import { TourneeOptions } from '../../interfaces/tournee-options';
import { ColisData } from '../../providers/colis-data';


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
  bddTour: any=[];
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  trajet: TrajetOptions = {idUser: null,idColis: null,idTour: null, depart: '', arrivee: '', date: '', id: null, code: null};
  tournee: TourneeOptions=  { idUser: null,idCar: null, depart: '', arrivee: '', date: '', id: null};
  idCar= false;
  tourneeList: any=[];

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
/////passager -> idCar False///////
//cherche la tournée dans laquelle il est ->getTourneeId - getIdTourneebdd (trajet)
//affiche la tournée ->getTourneeAll - getTourneeAllbdd(trajet)
//->affiche le trajet dans lequel il est : getTrajetbdd
//id tournee -> affiche tournée info
//donne toutes les infos de la tournée->getTrajetAll - getTrajetAllbdd(trajet)


/////conducteur -> idCar True///////
//selectionne le conducteur
//selectionne ses tournées ->getTournee - getTourneebdd(tournee)
// selectionne l'id tournee ->getIdTournee -getIdTourbdd(tournee)
//selectionne tout trajet en rapport avec ses tournées pour infos ->getTrajetAll - getTrajetAllbdd(trajet)

  async toast() {
    const toast = await this.toastController.create({
      message: 'Validez vos derniers trajets sous 24h',
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

  ngOnInit() {
  //  this.updateTrajet();


    this.toast();
    setTimeout(() => {
      this.getIdCar();
      setTimeout(()=>{
        this.updateTrajet();
      }, 300);
    }, 300);

    this.listenForLoginEvents();
  }


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

  updateTrajet(){
    this.bddTraj = [];
    this.bddTour = [];
    console.log("ddd"+ this.tournee.idCar)
    if (this.idCar === false){
      setTimeout(()=>{
        this.TrajetBdd();
      }, 200);
    }else {
      if(this.idCar === true){
      //  this.TrajetOnlyBdd();
        this.TourneeBdd();
      }
    }
  }

  TrajetBdd(){
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
    console.log(this.trajet.idUser);

    this.trajData.getTrajetbdd(this.trajet).then((response)=>{
      console.log('get: ', response);
      this.bddTraj = response;

      this.bddTraj.forEach((BddTraj: any)=>{
        console.log('depart: ', BddTraj.depart);
        console.log('arrivee: ', BddTraj.arrivee);
        this.shownSessions++;

        this.trajet.idTour = BddTraj.id_tournee;
      //  this.getTourneeAll(this.trajet);

      });
    });
  }

  getTourneeAll(tourId : any ){
    console.log("id tour: "+tourId.idTour)
    this.tourData.getTourneeAllbdd(tourId).then((response)=>{
      console.log('get tournee: ', response);
      this.tourneeList = response;
      this.tourneeList.forEach((Tournee: any)=>{
        console.log("idTournee "+ Tournee.id_tournee);
        this.shownSessions++;
        Tournee.hide;
      });
    });
  }

  TourneeBdd(){
    this.tournee.idUser = JSON.parse(localStorage.getItem('idUser')).id;
    console.log(this.tournee.idUser);

    this.tourData.getTourneebdd(this.tournee).then((response)=>{
      console.log("here")
      console.log('get: ', response);
      this.bddTour= response;
      this.bddTour.forEach((BddTour: any)=>{
        this.shownSessions++;

        console.log('depart: ', BddTour.depart);
        console.log('arrivee: ', BddTour.arrivee);

        BddTour.hide;
      });
    });
  }

  TrajetOnlyBdd(){
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
    console.log(this.trajet.idUser);

    this.tourData.getTrajetOnlybdd(this.trajet).then((response)=>{
      console.log('get: ', response);
      this.bddTraj = response;
      this.bddTraj.forEach((BddTraj: any)=>{
        this.shownSessions++;
        console.log('depart: ', BddTraj.depart);
        console.log('arrivee: ', BddTraj.arrivee);

        BddTraj.hide;
      });
    });
  }

  getIdCar(){
    this.tournee.idCar =null;
    this.idCar=false;

    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id;
    console.log(this.trajet.idUser);

    this.tourData.getIdCarbdd(this.trajet).then((response)=>{
      console.log('get Car: ', response);
      if(response != null){
        this.idCar=true;
        let respo= JSON.stringify(response);
        let resp = parseInt(respo);
        this.tournee.idCar =resp;
        console.log('get Car: ', this.idCar);
      }
      else{console.log("passager")}
    }).catch(() => {
      console.log('Error in getIdCar');
    });
  }




  /*
    updateTrajet() {
      // Close any open sliding items when the Trajet updates
      if (this.trajetList) {
        this.trajetList.closeSlidingItems();
      }

      this.trajData.getTimeline(this.dayIndex, this.queryText, this.segment).subscribe((data: any) => {
        this.shownSessions = data.shownSessions;
        this.groups = data.groups;
      });
    }*/
}
