import { Component,ViewChild } from '@angular/core';
import { ModalController, IonList } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { TrajetData } from '../../providers/trajet-data';
import { Router } from '@angular/router';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';
import {ModalComplaintPage} from '../modal-complaint/modal-complaint.page';
import { TrajetOptions } from '../../interfaces/trajet-options';
import { ColisData } from '../../providers/colis-data';
import { TourneeData } from '../../providers/tournee-data';

/**
*Informations about a ride
*/
@Component({
  selector: 'app-trajet-detail',
  styleUrls: ['./trajet-detail.page.scss'],
  templateUrl: 'trajet-detail.page.html'
})

export class TrajetDetailPage{
@ViewChild('trajetList', { static: true }) trajetList: IonList;

  trajet: TrajetOptions = {idUser: null,idColis: null,idTour: null,  depart: '', arrivee: '', date: '', id: null, code: null};
  session: any = [];
  info: any = [];
  defaultHref = '';
  isValidate = false;
  rate = false;
  complain = false;
  step: any = [];
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  shownSteps: any = [];
  bdd: any=[];
  colis: any=[];
  bddId: any;
  id: number;
  idCar= false;
  idTour: number= null;
  idUser: number= null;
  statut= null;
  commentbdd : string ;


/**
*[getIdCar]{@link TrajetDetailPage.html#getIdCar} before get informations about ride
*
*If driver, get ride informations [TrajetConduct]{@link TrajetDetailPage.html#TrajetConduct} and check validation status of the ride
*
*If traveller, get ride informations [getTrajetColis]{@link TrajetDetailPage.html#getTrajetColis} and [Trajetbdd]{@link TrajetDetailPage.html#Trajetbdd}and check validation status of the ride
*/
  constructor(
  private trajetData: TrajetData,
  public tourData: TourneeData,
  public router: Router,
  private userProvider: UserData,
  private route: ActivatedRoute,
  public colisData: ColisData,
  public modalCtrl: ModalController
  ){
    this.getIdCar();
    setTimeout(()=>{
      if(this.idCar===true){
        this.TrajetConduct();
        setTimeout(()=>{
          console.log("statuuuuut "+this.statut)
          console.log("commmeeent "+this.commentbdd)
          if(this.statut > 1){
            this.isValidate = true;
          }
          if(this.commentbdd != null){
            this.complain = true;
          }
        }, 300);

      }else{
        if(this.idCar===false){
          this.getTrajetColis();
          this.Trajetbdd();
          setTimeout(()=>{
            console.log("statuuuuut "+this.statut)
            console.log("commmeeent "+this.commentbdd)
            if(this.statut > 1){
              this.isValidate = true;
            }
            if(this.commentbdd != null){
              this.complain = true;
            }
          },300);
        }
      }
    }, 300);
  }

/**
*@ignore
*/
  ionViewWillEnter() {}

/**
*Get informations [getTrajetbdd]{@link }about the ride in case of a traveller to display them on the app then [getColis]{@link }
*/
  Trajetbdd(){
    console.log("PASSAGERRRRRRR")
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.defaultHref=`/tabs/trajet`;
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage

    this.trajetData.getTrajetbdd(this.trajet).then((response)=>{
      console.log('get: ', response);
      this.bdd = response;
      this.bdd.forEach((Bdd: any)=>{
        console.log(Bdd.id)
        if(Bdd.id === bddId){
          this.info = Bdd;
          console.log('depart: ', Bdd.depart);
          console.log('arrivee: ', Bdd.arrivee);
          this.idTour = Bdd.id_tournee;
          this.id= Bdd.id;
          this.statut = Bdd.statut;
          this.commentbdd = Bdd.comment;
          this.trajet.idColis = Bdd.id_colis;
          this.getColis(this.trajet);
        }
      });
    });
  }

/**
*Get informations [getTrajetConductbdd]{@link }about the ride in case of a driver to display them on the app then [getColis]{@link }
*/
  TrajetConduct(){
    console.log("CONDUCTEUUUUUUUUUR")

    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.trajet.id = bddId;

    this.trajetData.getTrajetConductbdd(this.trajet).then((response)=>{
      console.log('get: ', response)

      this.bdd = response;
      this.bdd.forEach((Bdd: any)=>{
        console.log(Bdd.id)
        console.log("ff"+ Bdd.id_tournee)
        this.bddId= Bdd.id_tournee;
        this.defaultHref= '/tabs/trajet/BddTour/'+this.bddId;
        console.log(this.defaultHref)
        if(Bdd.id === bddId){
          this.info = Bdd;
          console.log('depart: ', Bdd.depart);
          console.log('arrivee: ', Bdd.arrivee);
          this.idUser = Bdd.id_user;
          this.statut = Bdd.statut;
          this.commentbdd = Bdd.comment;
          this.trajet.idColis = Bdd.id_colis;
          this.getColis(this.trajet);
        }
      });
    });
  }

/**
*Get packages [getTrajetColisbdd]{@link } related to the ride in case of a traveller to display them on the app then [getColis]{@link }
*/
  getTrajetColis(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.trajet.idColis = bddId;
    this.trajetData.getTrajetColisbdd(this.trajet).then((response)=>{
      console.log(response);
      this.bdd = response;
      this.bdd.forEach((Bdd: any)=>{
        this.info = Bdd;
        this.getColis(this.trajet);
      })
    });
  }

/**
*Get informations [getColisbdd]{@link }about packages
*/
  getColis(colisId : any ){
    console.log("id colis: "+colisId.idColis)
    this.colisData.getColisbdd(colisId).then((response)=>{
      console.log('get Colis: ', response);
      this.colis = response;
      this.colis.forEach((Colis: any)=>{
        console.log("descr "+ Colis.descr);
        Colis.hide;
      });
    });
  }

/**
*@ignore
*/
  ionViewDidEnter() {}

/**
*function that define route navigation to ga back to the previous view
*/
goBack(){
  console.log("defaultHref"+this.defaultHref)
  this.router.navigateByUrl(this.defaultHref);
}

/**
*Go to map view with informations in case of a traveller
*/
goToMap(){
  let bddId: any = this.route.snapshot.paramMap.get('bddId');
  bddId=parseInt(bddId);
  this.router.navigateByUrl('/tabs/trajet/map/'+this.idTour+'/1/'+bddId);
}

/**
*Go to the QRCode view to validate the journey
*/
  qrcode(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    this.router.navigateByUrl('/tabs/trajet/qrcode/'+bddId);
  }

  /**
  *Get idCar from database [getIdCarbdd]{@link ../injectables/TourneeData.html#getIdCarbdd}
  */
  getIdCar(){
    this.idCar=false;

    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id;
    console.log(this.trajet.idUser);

    this.tourData.getIdCarbdd(this.trajet).then((response)=>{
      console.log('get Car: ', response);
      if(response != null){
        this.idCar=true;

        console.log('get Car: ', this.idCar);
      }
      else{console.log("passager")}
    }).catch(() => {
      console.log('Error in getIdCar');
    });
  }

/**
*Open the modal to rate the other user [ModalRatingPage]{@link ModalRatingPage.html}
*/
async openModalRating() {
  this.rate = true;
    const modal = await this.modalCtrl.create({
      component: ModalRatingPage,
      componentProps: {
        'idTour': this.idTour,
        'idTraveller': this.idUser
      }
    });
    return await modal.present();
  }

  /**
  *Open the modal to complain about the other user [ModalComplaintPage]{@link ModalComplaintPage.html}
  */
async openModalComplaint() {
  this.complain = true;
  let bddId: any = this.route.snapshot.paramMap.get('bddId');
  bddId=parseInt(bddId);
      const modal = await this.modalCtrl.create({
        component: ModalComplaintPage,
        componentProps: {
          'idTraj': bddId
        }
      });
      return await modal.present();
    }
}

/**
*@ignore
*/
/*
validate() {
  this.trajetData.validateStatusbdd(this.info).then((response)=>{
    console.log("validation status: "+ response);
  });
}
*/
