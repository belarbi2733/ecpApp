import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PositionService } from '../../providers/position';

declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private geolocation: Geolocation, private posApi:PositionService){
}
  locTab:String[]= [];
  data:string = '';
  lat: any;
  long: any;
  map: any;
  marker: any;
  id: number;
  ngOnInit(){
  this.watch();

  }

  maping(lat, long){
     const map = tomtom.L.map('myMap', {
      key: 'LUsOnGPl0AFOpcXNL3kdfgx3cU2qA4jE',
      basePath: '../../../assets/tomtom',
      center: [lat, long],
      zoom: 15
    });
    var title = 'babla';
    var marker = tomtom.L.marker(new tomtom.L.LatLng(lat, long), {title: title});
    marker.bindPopup(title);
    map.addLayer(marker);
    this.marker= marker;
    this.map= map;
  }

  maping2(lat, long, map){
    map.removeLayer(this.marker);
    var title = 'babla';
    var marker = tomtom.L.marker(new tomtom.L.LatLng(lat, long), {title: title});
    marker.bindPopup(title);
    map.addLayer(marker);
    this.marker= marker;
  }

  watch(){
    let i =0;
    const watch = this.geolocation.watchPosition({enableHighAccuracy : true, timeout : 1000}).subscribe(position =>{
      if(position.coords !== undefined){
        let locationString = position.coords.longitude + '\t'+ position.coords.latitude;
        this.locTab.push(locationString);
        console.log(locationString);
        this.positionSend(position.coords.latitude, position.coords.longitude);
        this.lat = position.coords.latitude;
        this.long= position.coords.longitude;
        while(i<1){
          this.maping(this.lat, this.long);
          i++;
        }
        this.maping2(this.lat, this.long, this.map);
      }else{
        console.log(position); //Afficher l'erreur
        throw "Impossible de récupérer la position.";
      }
    });

  }
  positionSend(lat, long){
    this.id = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
    this.posApi.sendPosition(lat, long, this.id).subscribe((response)=>{
      console.log(response);
    });
  }

}
  /*
  onSuccess(position){
    let lattitude=position.coords.lattiude;
    let longitude= position.coords.longitude;
    let locText = '\n Lat : '+ lattitude + ' Long : '+longitude;
    this.locTab.push(locText);
    console.log(this.locTab);
  }
  onError(err){
    console.log(err.code +'\t' +err.message);
  }
  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      let lattitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      // resp.coords.latitude
      // resp.coords.longitude

      let locText = '\n Lat : '+ lattitude + ' Long : '+longitude;
      // console.log(locText);
      this.locTab.push(locText);
      console.log(this.locTab);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    // this.Time;
  }
}




/*import { Component } from '@angular/core';
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
/*
}
*/
