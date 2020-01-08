import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ServiceData} from '../../providers/serviceData';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TrajetOptions } from '../../interfaces/trajet-options';
import { TourneeOptions } from '../../interfaces/tournee-options';
import { TourneeData } from '../../providers/tournee-data';
import { TrajetData } from '../../providers/trajet-data';


/**
*Page that allow the user to generate the QR-Code and the driver to scan the QR-Code to valide their journey
*/
@Component({
  selector: 'app-qrcode',
  templateUrl: 'qrcode.page.html',
  styleUrls: ['qrcode.page.scss']
})

export class QRCodePage {
  createdCode = null;
  scannedCode = null;
  trajet: TrajetOptions = {idUser: null,idColis: null,idTour: null,  depart: '', arrivee: '', date: '', id: null, code: null};
  tournee: TourneeOptions=  { idUser: null,idCar: null, depart: '', arrivee: '', date: '', id: null};
  idCar= false;

  constructor(
  private barcodeScanner : BarcodeScanner,
  private api: ServiceData,
  private route: ActivatedRoute,
  public tourData: TourneeData,
  private dataProvider: TrajetData,
  public router: Router
  ) {}

/**
*First call [getIdCar]{@link QRCodePage.html#getIdCar} to know if the user is a driver or a traveller
*
*Then if traveller, call [generateCode]{@link QRCodePage.html#generateCode}
*
*If driver, call [scanCode]{@link QRCodePage.html#scanCode}
*/
  ngOnInit(){
    this.getIdCar();
    setTimeout(()=>{
      if(this.idCar == true){
        this.scanCode();
      }else{
        if(this.idCar == false){
          this.generateCode();
        }
      }
    }, 200);
  }

/**
*Based on the id of the trajet, get the code frome the data Base [getCodebdd]{@link ../injectables/TrajetData.html#getCodebdd}
*
*Generate a QR-Code corresponding to that code
*/
generateCode(){
  let bddId: any = this.route.snapshot.paramMap.get('bddId');
  this.trajet.id = bddId;
  this.api.getCodebdd(this.trajet).subscribe((response)=>{
    this.createdCode= response;
    console.log('get: ', response);
  });
}

/**
*Acces to the camera and the native function to scan a QR-code the call [checkCode]{@link  QRCodePage.html#checkCode}
*/
scanCode(){
  this.barcodeScanner.scan().then(barcodeData => {
    this.scannedCode = barcodeData.text;
    this.trajet.code = this.scannedCode;
    this.checkCode();
  })
}

/**
*Function that compare code of the traveller and driver to validate the ride using [checkCodebdd]{@link ../injectables/ServiceData.html#checkCodebdd}
*
*If the code is correct, the status of the trajet is change in the data base to validate with [validateStatusbdd]{@link ../injectables/TrajetData.html#validateStatusbdd}
*/
checkCode(){
  let bddId: any = this.route.snapshot.paramMap.get('bddId');
  this.trajet.id = bddId;
  this.api.checkCodebdd(this.trajet).then((checkcodeStatus: boolean)=>{
    if(checkcodeStatus){
      console.log("check code OK")
      this.dataProvider.validateStatusbdd(this.trajet).then((response)=>{
        console.log("validation status: "+ response);
      });
    }
    }).catch(()=>{
      console.log("erreur de vérification");
    });
  }

/**
*Function that send the user to the previous page
*/
done(){
  let bddId: any = this.route.snapshot.paramMap.get('bddId');
  this.router.navigateByUrl('/tabs/trajet/BddTraj/'+bddId);
}

/**
*Get idCar to know if user is a driver or a traveller
*
*Call [getIdCarbdd]{@link ../injectables/TourneeData.html#getIdCarbdd}
*/
getIdCar(){
  this.trajet.idUser = JSON.parse(localStorage.getItem('idUser')).id;
  console.log(this.trajet.idUser);

  this.tourData.getIdCarbdd(this.trajet).then((response)=>{
    console.log('get Car: ', response);
    if(response != null){
      this.idCar=true;
      let respo= JSON.stringify(response);
      let resp = parseInt(respo);
      this.tournee.idCar =resp;
      console.log('get Car: ', this.idCar);
    }
    else{console.log("passager")}
  }).catch(() => {
    console.log('Error in getIdCar');
  });
}

}
