import { Component, OnInit, Input,  EventEmitter ,Output  } from '@angular/core';
import { Config, ModalController,NavParams , AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';




@Component({
  selector: 'app-modal-complaint',
  templateUrl: './modal-complaint.page.html',
  styleUrls: ['./modal-complaint.page.scss'],
})
export class ModalComplaintPage implements OnInit {

  submittedMess = false;
  supportMessage: string;

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
) { }


  ngOnInit() {
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
  async openModalRating() {
      const modal = await this.modalCtrl.create({
        component: ModalRatingPage
      });
      return await modal.present();
    }

  async submit(form: NgForm) {

      this.submittedMess = true;

      if (form.valid ) {

        this.submittedMess = false;

        const toast = await this.toastCtrl.create({
          message: 'Votre message a été envoyé à l\'administrateur',
          duration: 3000
        });
        await toast.present();
        this.openModalRating();
      }
}
}
