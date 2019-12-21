import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PositionService } from '../../providers/position';
import { ActivatedRoute } from '@angular/router';
import { TrajetOptions } from '../../interfaces/trajet-options';
import { TrajetData } from '../../providers/trajet-data';
import { Router } from '@angular/router';

declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private geolocation: Geolocation,
    private posApi:PositionService,
    private route: ActivatedRoute,
    public router: Router,
    private trajData: TrajetData
){}

  locTab:String[]= [];
  data:string = '';
  lat: any;
  long: any;
  map: any;
  marker: any;
  id: number;
  trajet: TrajetOptions=  { idUser: null, idColis: null,idTour: null, depart: '', arrivee: '', date: '', id: null, code: null};
  User: any;
  Posi: any;
  defaultHref = '';
  newmark: any[]=[];

  ngOnInit(){
    if(this.route.snapshot.paramMap.get('idTour')){
      let num : any = this.route.snapshot.paramMap.get('num');
      if(num == 1){
        this.defaultHref=`/tabs/trajet/BddTraj/`;
        this.getDriverId();
        this.watch();
      }else{
        if(num == 2 ){
          this.defaultHref=`/tabs/trajet/BddTour/`;
          this.beAware();
          this.watch();
        }
      }
    }
    else {
      this.watch();
    }
  }
//initialise la map
  maping(lat, long){
     const map = tomtom.L.map('myMap', {
      key: 'X4yRaq0tGtRPAIMAmb0X7wpzW6dAGKQE',
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
    var title = 'Vous';
    var marker = tomtom.L.marker(new tomtom.L.LatLng(lat, long), {title: title});
    marker.bindPopup(title);
    map.addLayer(marker);
    this.marker= marker;
  }

//check régulièrement les changements dans la DB
  beAware(){
    const watch = this.geolocation.watchPosition({enableHighAccuracy: true, timeout: 1000}).subscribe(position =>{
      this.getUsersId();
    });
  }

  //Regarde en temps réel la position de l'utilisateur de l'appareil
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

  //Sauve la position de l'utilisateur dans la DB
  positionSend(lat, long){
    this.id = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
    this.posApi.sendPosition(lat, long, this.id).subscribe((response)=>{
      console.log(response);
    });
  }
  //Cherche l'id du conducteur en charge du trajet
  getDriverId(){
    let idTour: any = this.route.snapshot.paramMap.get('idTour');
    idTour = parseInt(idTour);
    this.trajet.idTour = idTour;
    this.posApi.getDriverbdd(this.trajet).then((response)=>{
      console.log(response);
      this.getPosition(response);
    });
  }

//Cherche les Id de tous les utilisateurs concernés par une tournée
  getUsersId(){
    let idTour: any = this.route.snapshot.paramMap.get('idTour');
    idTour = parseInt(idTour);
    this.trajet.idTour = idTour;
    this.trajData.getTrajetAllbdd(this.trajet).then((response)=>{
    this.User= response
    this.User.forEach((user: any)=>{
        this.getPosition(user.id_user);
        });
    });
  }

  //Cherche la position des utilisateurs et l'affiche sur la map
  getPosition(id){
    this.trajet.idUser= id;
    this.posApi.getPositionbdd(this.trajet).then((response)=>{
      console.log(response);
      this.Posi = response;
      this.Posi.forEach((posi: any)=>{
        console.log(posi.prenom)
        this.maping3(posi.position_lat, posi.position_long, this.map, posi.prenom);
      });
    });
  }

  maping3(lat, long, map, name){
    this.newmark.forEach((mark: any)=>{
      if(mark.options.title== name){
        map.removeLayer(mark);
      }
    })

    console.log("add")
    var title = name;
    var marker = tomtom.L.marker(new tomtom.L.LatLng(lat, long), {title: title});
    marker.bindPopup(title);
    map.addLayer(marker);
    this.newmark.push(marker);
  }
  goBack(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.defaultHref=this.defaultHref+bddId;
    console.log("hey"+this.defaultHref)
    this.router.navigateByUrl(this.defaultHref);
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
