import { Component, OnInit, Input,  EventEmitter ,Output  } from '@angular/core';
import { Config, ModalController,NavParams , AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { TrajetOptions } from '../../interfaces/trajet-options';
import { PositionService } from '../../providers/position';


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
  supportMessage: string;
  submitRating = false;
  clickedRating = false;
  idUser: number;
  trajet: TrajetOptions=  { idUser: null, idColis: null,idTour: null, depart: '', arrivee: '', date: '', id: null, code: null};
  response: any;

  @Input() rating: number ;
  @Input() idTour: number;
  @Input() idTraveller: number;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    private route: ActivatedRoute,
    private posApi:PositionService,
    public toastCtrl: ToastController,
    public navParams: NavParams
    ) {
      let idTraveller: any =this.navParams.get('idTraveller');
      let idTour: any =this.navParams.get('idTour');
      if(idTour!= null){
        idTour = parseInt(idTour);
        this.getDriverId(idTour);
        this.sendRating();
      }else{
        if(idTraveller != null){
           this.idUser = parseInt(idTraveller);
           this.sendRating();
        }
      }
     }

ngOnInit(){

}
  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  /**
  *Get the rating from the form
  */
  rate(index: number) {

      this.rating = index;
      this.ratingChange.emit(this.rating);
      this.clickedRating =true;

   }

   sendRating(){

     setTimeout(()=>{

       console.log("idUser"+this.idUser)
       console.log("rating"+this.rating)

       this.userData.sendRatingbdd(this.idUser, this.rating).then((response)=>{
         console.log(response);
       });
     }, 300);
   }

   //Cherche l'id du conducteur en charge du trajet
   getDriverId(idTour){
     this.trajet.idTour = idTour;
     this.posApi.getDriverbdd(this.trajet).then((response)=>{
       this.response = response;
       this.idUser= this.response;
     });
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

  //    this.submittedMess = true;
      this.submitRating = true;
      if (form.valid && this.clickedRating === true) {
        this.sendRating();
        //this.submittedMess = false;
        const toast = await this.toastCtrl.create({
          message: 'Votre avis a été enregistré',
          duration: 3000
        });
        await toast.present();
        this.router.navigateByUrl('/tabs/trajet');
        this.modalCtrl.dismiss();
      }


  }


}
