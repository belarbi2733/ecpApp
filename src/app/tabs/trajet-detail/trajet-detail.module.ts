import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrajetDetailPage } from './trajet-detail.page';
import {ModalRatingPageModule} from '../modal-rating/modal-rating.module';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TrajetDetailPage }])
  ],
  declarations: [
    TrajetDetailPage,
    ModalRatingPage]
    ,
  entryComponents: [
    ModalRatingPage
  ]
})
export class TrajetDetailPageModule {}
