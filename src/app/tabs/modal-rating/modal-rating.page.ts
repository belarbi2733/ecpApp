import { Component, OnInit, Input,  EventEmitter ,Output  } from '@angular/core';
import { Config, ModalController,NavParams , AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW ="#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.page.html',
  styleUrls: ['./modal-rating.page.scss'],
})
export class ModalRatingPage implements OnInit {
  submittedMess = false;
  submittedRating = false;
  supportMessage: string;
  star : number;

  @Input() rating: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

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

  rate(index: number) {

      this.rating = index;
      this.ratingChange.emit(this.rating);
   }

   getColor(index: number) {

      if (this.isAboveRating(index)){
        return COLORS.GREY;
      }
      switch (this.rating){
        case 1:
        case 2:
          return COLORS.RED;
        case 3:
          return COLORS.YELLOW;
        case 4:
        case 5:
          return COLORS.GREEN;
        default:
        return COLORS.GREY;
      }
    }

    isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  async submit(form: NgForm) {
    this.submittedMess = true;
    this.submittedRating = true;

    if (form.valid) {

      this.supportMessage = '';
      this.submittedMess = false;
      this.submittedRating = false;

      const toast = await this.toastCtrl.create({
        message: 'Votre avis a été enregistré',
        duration: 3000
      });
      await toast.present();
    }
  }


}