import { Component,ViewChild } from '@angular/core';
import { ModalController, IonList } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { Router } from '@angular/router';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';
import {ModalComplaintPage} from '../modal-complaint/modal-complaint.page';
import { TourneeOptions } from '../../interfaces/tournee-options';
import { TourneeData } from '../../providers/tournee-data';
import { TrajetOptions } from '../../interfaces/trajet-options';
import { TrajetData } from '../../providers/trajet-data';

let resp: any;

/**
*List of steps of a round of a driver
*/
@Component({
  selector: 'app-step-detail',
  styleUrls: ['./step-detail.page.scss'],
  templateUrl: 'step-detail.page.html'
})

export class StepDetailPage{
  @ViewChild('tourneeList', { static: true }) tourneeList: IonList;

  session: any = [];
  defaultHref = `/tabs/trajet`;
  isValidate = false;
  step: any = [];
  bddTraj: any =[];
  Info: any =[];
  info: any =[];
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  idCar= false;
  shownSessions: any = 0;
  tournee: TourneeOptions=  { idUser: null,idCar: null, depart: '', arrivee: '', date: '', id: null};
  trajet: TrajetOptions=  { idUser: null, idColis: null,idTour: null, depart: '', arrivee: '', date: '', id: null, code: null};


/**
*@ignore
*/
  constructor(
  private dataProvider: TrajetData,
  public router: Router,
  private userProvider: UserData,
  private route: ActivatedRoute,
  public tourData: TourneeData,
  public modalCtrl: ModalController,
  public trajData: TrajetData
  ){  }


/**
*[getIdCar]{@link StepDetailPage.html#getIdCar} then [getIdTour]{@link StepDetailPage.html#getIdTour} before [TrajetBdd]{@link StepDetailPage.html#TrajetBdd}
*/
  ngOnInit() {
      this.getIdCar();
      this.getIdTour();
      setTimeout(()=>{
        this.TrajetBdd();
      }, 200);
  }

  /**
  *Get all rides corresponding to the round [getTrajetAllbdd]{@link ../injectables/TrajetData.html#getTrajetAllbdd}
  */
  TrajetBdd(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
    this.trajData.getTrajetAllbdd(this.trajet).then((response)=>{
      console.log('get: ', response);
      this.bddTraj = response;
      this.bddTraj.forEach((BddTraj: any)=>{
        console.log(BddTraj.id_tournee )
        if(BddTraj.id_tournee === bddId){
          this.Info.push(BddTraj);
          this.shownSessions++;
          console.log('depart: ', BddTraj.depart);
          console.log('arrivee: ', BddTraj.arrivee)
          console.log( this.Info);
        }
        for( const info of this.Info){
          this.info = info;
        }
      });
    });
  }

/**
*Get id of the round from route parameter
*/
  getIdTour(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.trajet.idTour = bddId;
  }

/**
*Get idCar from database [getIdCarbdd]{@link ../injectables/TourneeData.html#getIdCarbdd}
*/
  getIdCar(){
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id;
    console.log(this.trajet.idUser);

    this.tourData.getIdCarbdd(this.trajet).then((response)=>{
      console.log('get Car: ', response);
      if(response != null){
        this.idCar=true;

        let respo= JSON.stringify(response);
        let resp = parseInt(respo);
        this.tournee.idCar = resp;
        console.log('get Car: ', this.tournee.idCar);
      }
    }).catch(() => {
      console.log('Error in getIdCar');
    });
  }

/**
*Go to map view with informations
*/
  goToMap(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.router.navigateByUrl('/tabs/trajet/map/'+bddId+'/2/'+  bddId);
  }
}
