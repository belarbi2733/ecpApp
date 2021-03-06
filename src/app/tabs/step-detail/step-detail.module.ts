import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepDetailPage } from './step-detail.page';
import {ModalRatingPageModule} from '../modal-rating/modal-rating.module';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';
import {ModalComplaintPage} from '../modal-complaint/modal-complaint.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: StepDetailPage }])
  ],
  declarations: [
    StepDetailPage]
})
export class StepDetailPageModule {}
