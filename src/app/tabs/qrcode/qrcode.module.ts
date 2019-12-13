import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodePage } from './qrcode.page';

import {NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxQRCodeModule,
    RouterModule.forChild([{ path: '', component: QRCodePage }])
  ],
  declarations: [QRCodePage],
  providers: [BarcodeScanner]
})
export class QRCodePageModule {}
