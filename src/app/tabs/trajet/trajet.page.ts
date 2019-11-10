import {  ViewChild, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { TrajetData } from '../../providers/trajet-data';


@Component({
  selector: 'app-trajets',
  templateUrl: 'trajet.page.html',
  styleUrls: ['trajet.page.scss']
})
export class TrajetPage {
  @ViewChild('trajetList', { static: true }) trajetList: IonList;

  shownSessions: any = [];
  groups: any = [];
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';

  constructor(
    public router: Router,
    public user: UserData,
    public config: Config,
    public trajData: TrajetData,
    public toastController: ToastController
  ) {}

  async toast() {
    const toast = await this.toastController.create({
      message: 'Validez vos derniers trajets sous 24h',
      duration: 4000,
      buttons: [{
          text: 'ok',
          role: 'cancel',
          handler: () => {
            toastController.dismiss()
          }
        }]
    });
    toast.present();
  }

  ngOnInit() {
    this.updateTrajet();
    this.toast();
  }

  updateTrajet() {
    // Close any open sliding items when the Trajet updates
    if (this.trajetList) {
      this.trajetList.closeSlidingItems();
    }

    this.trajData.getTimeline(this.dayIndex, this.queryText, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }




}
