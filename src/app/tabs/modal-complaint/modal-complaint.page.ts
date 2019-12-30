import { Component, OnInit, Input,  EventEmitter ,Output  } from '@angular/core';
import { Config, ModalController,NavParams , AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';
import { TrajetData } from '../../providers/trajet-data';





@Component({
  selector: 'app-modal-complaint',
  templateUrl: './modal-complaint.page.html',
  styleUrls: ['./modal-complaint.page.scss'],
})
export class ModalComplaintPage implements OnInit {

  submittedMess = false;
  supportMessage: string;
  isClosed = false;

  @Input() idTraj: number;

  constructor(
    private trajetData: TrajetData,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
) { }


  ngOnInit() {
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

 sendComment(){
    setTimeout(()=>{
      console.log("comment"+this.supportMessage)
      console.log("id"+this.idTraj)
      this.trajetData.sendCommentbdd(this.supportMessage, this.idTraj).then((response)=>{
        console.log(response);
      });
    }, 300);
  }

  async openModalRating() {
      const modal = await this.modalCtrl.create({
        component: ModalRatingPage
      });
      return await modal.present();
    }

  async submit(form: NgForm) {

      this.submittedMess = true;
      this.isClosed = true;


      if (form.valid ) {
        console.log("support mess: "+this.supportMessage)
        this.submittedMess = false;
        this.sendComment();
        const toast = await this.toastCtrl.create({
          message: 'Votre message a été envoyé à l\'administrateur',
          duration: 3000
        });
        await toast.present();
        this.modalCtrl.dismiss();
        this.openModalRating();

      }
}
}
