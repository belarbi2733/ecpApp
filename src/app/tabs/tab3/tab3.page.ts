import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ServiceData} from '../../providers/serviceData';
import { TrajetOptions } from '../../interfaces/trajet-options';

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
  trajet: TrajetOptions = {idUser: null,idColis: null,idTour: null,  depart: '', arrivee: '', date: '', id: null, code: null};


  constructor(
  //  public userData: UserData
  private barcodeScanner : BarcodeScanner,
  private api: ServiceData
  ) {}

  ngOnInit(){
  //  this.update();
  this.scanCode();
  }


  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.trajet.code = this.scannedCode;
      this.checkCode();
    })
  }

  checkCode(){
    this.api.checkCodebdd(this.trajet).then((checkcodeStatus: boolean)=>{
      if(checkcodeStatus){
        console.log("check code OK")
      }
      }).catch(()=>{
        console.log("erreur de vérification");
      });
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
