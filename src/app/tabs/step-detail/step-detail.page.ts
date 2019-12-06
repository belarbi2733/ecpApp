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


@Component({
  selector: 'app-step-detail',
  styleUrls: ['./step-detail.page.scss'],
  templateUrl: 'step-detail.page.html'
})

export class StepDetailPage{
  @ViewChild('tourneeList', { static: true }) tourneeList: IonList;


  session: any = [];
  defaultHref = '';
  isValidate = false;
  step: any = [];
  bddTraj: any =[];
  Info: any =[];
  info: any =[];
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  shownSessions: any = 0;
  tournee: TourneeOptions=  { idUser: null, depart: '', arrivee: '', date: '', id: null};
  trajet: TourneeOptions=  { idUser: null, depart: '', arrivee: '', date: '', id: null};



  constructor(
  private dataProvider: TrajetData,
  public router: Router,
  private userProvider: UserData,
  private route: ActivatedRoute,
  public modalCtrl: ModalController,
  public trajData: TrajetData
  ){}



  ngOnInit() {
    this.TrajetBdd();
    /*
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.trajet && data.trajet[0] && data.trajet[0].groups) {
        const stepId = this.route.snapshot.paramMap.get('stepId');
        for (const group of data.trajet[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {

              if(session && session.steps){
                for (const step of session.steps){
                  if(step && step.id === stepId){
                    this.step = step;
                    break;
                  }

                }
              }
            }
          }
        }
      }
    });*/
  }

  TrajetBdd(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage

    this.trajData.getTrajetbdd(this.trajet).then((response)=>{
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
          console.log( this.info);
        }

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
  this.defaultHref = `/tabs/trajet`;
}

/*

sessionClick(item: string) {
  console.log('Clicked', item);
}*/
/*
validate() {
    if (this.userProvider.hasValidate(this.session.id)) {
      //add popup déjà validé
      this.isValidate = true;
    } else {
      this.userProvider.addValidation(this.session.id);
      this.isValidate = true;
    }
  }
*/

/*
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
*/

}
