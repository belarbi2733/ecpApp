import { Component, OnInit, Input  } from '@angular/core';
import { Config, ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.page.html',
  styleUrls: ['./modal-rating.page.scss'],
})
export class ModalRatingPage implements OnInit {


  constructor(
    public modalCtrl: ModalController

) { }


  ngOnInit() {
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }


}
