import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';

import {LoginPageModule} from '../tabs/login/login.module';
import { TrajetPageModule } from '../tabs/trajet/trajet.module';
import { TrajetDetailPageModule } from '../tabs/trajet-detail/trajet-detail.module';
import {ModalRatingPage} from '../tabs/modal-rating/modal-rating.page';
import { ModalRatingPageModule } from '../tabs/modal-rating/modal-rating.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
//    ModalRatingPageModule
  ],
  declarations: [TabsPage]
/*  entryComponents: [
    ModalRatingPage]*/
})
export class TabsPageModule {}
