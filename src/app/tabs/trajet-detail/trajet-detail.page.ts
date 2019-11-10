import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { TrajetData } from '../../providers/trajet-data';
import { Router } from '@angular/router';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';


@Component({
  selector: 'app-trajet-detail',
  styleUrls: ['./trajet-detail.page.scss'],
  templateUrl: 'trajet-detail.page.html'
})

export class TrajetDetailPage{
  session: any;
  defaultHref = '';
  isValidate = false;


  constructor(
  private dataProvider: TrajetData,
  private userProvider: UserData,
  private route: ActivatedRoute,
  public router: Router,
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
                break;
              }
            }
          }
        }
      }
    });
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

onComplaint(){
  this.router.navigateByUrl('/tabs/login');

}
/**
openModal() {
  let modal = this.modalCtrl.create(ModalRatingPage);
modal.present();
}*/


async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalRatingPage
    });
    return await modal.present();
  }









}
