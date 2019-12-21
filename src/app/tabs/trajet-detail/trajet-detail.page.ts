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
  id: number;
  idCar= false;
  idTour: number= null;
  idUser: number= null;
  statut= null;

  constructor(
  private dataProvider: TrajetData,
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
          if(this.statut > 1){
            this.isValidate = true;
          }
        }, 300);

      }else{
        if(this.idCar===false){
          this.getTrajetColis();
          this.dataLoading();
          setTimeout(()=>{
            console.log("statuuuuut "+this.statut)
            if(this.statut > 1){
              this.isValidate = true;
            }
          },300);

        }
      }
    }, 300);
  }

  ionViewWillEnter() {



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
          this.idTour = Bdd.id_tournee;
          this.id= Bdd.id;
          this.statut = Bdd.statut;
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
          this.idUser = Bdd.id_user;
          this.statut = Bdd.statut;
          this.trajet.idColis = Bdd.id_colis;
          this.getColis(this.trajet);

        //  this.isValidate = this.userProvider.hasValidate(this.info.id);
        }
      });

    });
  }

  getTrajetColis(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.trajet.idColis = bddId;
    this.dataProvider.getTrajetColisbdd(this.trajet).then((response)=>{
      console.log(response);
      this.bdd = response;
      this.bdd.forEach((Bdd: any)=>{
        this.info = Bdd;
        this.getColis(this.trajet);
      })
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

goToMap(){
  let bddId: any = this.route.snapshot.paramMap.get('bddId');
  bddId=parseInt(bddId);
  this.router.navigateByUrl('/tabs/trajet/map/'+this.idTour+'/1/'+bddId);
}

sessionClick(item: string) {
  console.log('Clicked', item);
}

validate() {
  this.dataProvider.validateStatusbdd(this.info).then((response)=>{
    console.log("validation status: "+ response);
  });
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
      component: ModalRatingPage,
      componentProps: {
        'idTour': this.idTour,
        'idTraveller': this.idUser
      }
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
