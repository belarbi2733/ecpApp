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

generateCode(){
  let bddId: any = this.route.snapshot.paramMap.get('bddId');
  this.trajet.id = bddId;
  this.api.getCodebdd(this.trajet).subscribe((response)=>{
    this.createdCode= response;
    console.log('get: ', response);
  });
}

scanCode(){
  this.barcodeScanner.scan().then(barcodeData => {
    this.scannedCode = barcodeData.text;
    this.trajet.code = this.scannedCode;
    this.checkCode();
  })
}

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

done(){
  let bddId: any = this.route.snapshot.paramMap.get('bddId');
  this.router.navigateByUrl('/tabs/trajet/BddTraj/'+bddId);
}

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
