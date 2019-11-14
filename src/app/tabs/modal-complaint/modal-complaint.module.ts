import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {ModalRatingPage} from '../modal-rating/modal-rating.page';

import { ModalComplaintPage } from './modal-complaint.page';

const routes: Routes = [
  {
    path: '',
    component: ModalComplaintPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalComplaintPage,ModalRatingPage],
  entryComponents: [
      ModalComplaintPage,ModalRatingPage
    ]
})
export class ModalComplaintPageModule {}
