import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ServiceData} from '../../providers/serviceData';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  //userIndex = 0;
  //queryText = '';
  //segment = 'all';
  //groups: any = [];
  //shownSessions: any = [];
  createdCode = null;
  scannedCode = null;

  constructor(
  //  public userData: UserData
  private barcodeScanner : BarcodeScanner,
  private api: ServiceData
  ) {}

  ngOnInit(){
  //  this.update();
  }


generateCode(){

  this.api.getCode().subscribe((response)=>{
    this.createdCode= response;
    console.log('get: ', response);
  });


}

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
  }
  /*
  update(){
    this.userData.getInfo(this.userIndex , this.queryText, this.segment).subscribe((data:any)=>{
      this.shownSessions = data.shownSessions;
      console.log(this.shownSessions);
      this.groups = data.groups;
    });
  }
  */

}
