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
  step: any = [];
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  shownSteps: any = [];
  bdd: any=[];
  colis: any=[];
  bddId: any;
  id: any;
  idCar= false;
  constructor(
  private dataProvider: TrajetData,
  public tourData: TourneeData,
  public router: Router,
  private userProvider: UserData,
  private route: ActivatedRoute,
  public colisData: ColisData,
  public modalCtrl: ModalController

  ){
  }

  ionViewWillEnter() {
    this.getIdCar();
    setTimeout(()=>{
      if(this.idCar===true){
        this.TrajetConduct();
      }else{
        if(this.idCar===false){
          this.dataLoading();
        }
      }
    }, 300);


    /*this.dataProvider.load().subscribe((data: any) => {
      if (data && data.trajet && data.trajet[0] && data.trajet[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.trajet[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                this.isValidate = this.userProvider.hasValidate(
                  this.session.id
                );
              }
              if(session && session.steps){
                for (const step of session.steps){
                  this.step = step;
                  this.updateSteps();
                }
              }
            }
          }
        }
      }
    });*/
  }

  dataLoading(){
    console.log("PASSAGERRRRRRR")
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.defaultHref=`/tabs/trajet`;
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage

    this.dataProvider.getTrajetbdd(this.trajet).then((response)=>{
      console.log('get: ', response);
      this.bdd = response;
      this.bdd.forEach((Bdd: any)=>{
        console.log(Bdd.id)
        if(Bdd.id === bddId){
          this.info = Bdd;
          console.log('depart: ', Bdd.depart);
          console.log('arrivee: ', Bdd.arrivee);

          this.trajet.idColis = Bdd.id_colis;
          this.getColis(this.trajet);

          //this.isValidate = this.userProvider.hasValidate(this.info.id);
        }
      });

    });
  }

  TrajetConduct(){
    console.log("CONDUCTEUUUUUUUUUR")

    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.trajet.id = bddId;

    this.dataProvider.getTrajetConductbdd(this.trajet).then((response)=>{
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

          this.trajet.idColis = Bdd.id_colis;
          this.getColis(this.trajet);

        //  this.isValidate = this.userProvider.hasValidate(this.info.id);
        }
      });

    });
  }

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
/*
  updateSteps(){
    this.dataProvider.getSteps(this.dayIndex, this.queryText, this.segment).subscribe((data: any) =>{
      this.shownSteps = data.shownSteps;
    })
  }
*/
  ionViewDidEnter() {
}

goBack(){
  console.log("hey"+this.defaultHref)

  this.router.navigateByUrl(this.defaultHref);
}


sessionClick(item: string) {
  console.log('Clicked', item);
}

validate() {
    if (this.userProvider.hasValidate(this.session.id)) {
      //add popup déjà validé
      this.isValidate = true;
    } else {
      this.userProvider.addValidation(this.session.id);
      this.isValidate = true;
    }
  }

  qrcode(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    this.router.navigateByUrl('/tabs/trajet/qrcode/'+bddId);

  }

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

async openModalRating() {
    const modal = await this.modalCtrl.create({
      component: ModalRatingPage
    });
    return await modal.present();
  }

async openModalComplaint() {
      const modal = await this.modalCtrl.create({
        component: ModalComplaintPage
      });
      return await modal.present();
    }
}
