import { Component,ViewChild } from '@angular/core';
import { ModalController, IonList } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { TrajetData } from '../../providers/trajet-data';
import { Router } from '@angular/router';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';
import {ModalComplaintPage} from '../modal-complaint/modal-complaint.page';


@Component({
  selector: 'app-trajet-detail',
  styleUrls: ['./trajet-detail.page.scss'],
  templateUrl: 'trajet-detail.page.html'
})

export class TrajetDetailPage{
@ViewChild('trajetList', { static: true }) trajetList: IonList;

  session: any = [];
  defaultHref = '';
  isValidate = false;
  step: any = [];
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  shownSteps: any = [];


  constructor(
  private dataProvider: TrajetData,
  public router: Router,
  private userProvider: UserData,
  private route: ActivatedRoute,
  public modalCtrl: ModalController

  ){}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
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
    });
  }

  updateSteps(){
    this.dataProvider.getSteps(this.dayIndex, this.queryText, this.segment).subscribe((data: any) =>{
      this.shownSteps = data.shownSteps;
    })
  }

  ionViewDidEnter() {
  this.defaultHref = `/tabs/trajet`;
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
