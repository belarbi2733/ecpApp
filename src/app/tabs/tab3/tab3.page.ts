import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PositionService } from '../../providers/position';
import { ActivatedRoute } from '@angular/router';
import { TrajetOptions } from '../../interfaces/trajet-options';
import { TrajetData } from '../../providers/trajet-data';
import { Router } from '@angular/router';

declare let L;
declare let tomtom: any;

/**
*Page that allow to access to the map to show where are the users bound to the same ride
*/
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

/**
*It get a parameter from the route
*
*If number 1, the traveller can see himself and the driver on the map [getDriverId]{@link Tab3Page.html#getDriverId} and [watch]{@link Tab3Page.html#watch}
*
*If number 2, the driver can see himself and every user that are in that round [beAware]{@link Tab3Page.html#beAware} and [watch]{@link Tab3Page.html#watch}
*/
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

  /**
  *Initialise the map with tomtom api and add the first marker
  *@param {string} lat
  *@param {string} long
  */
  maping(lat, long){
     const map = tomtom.L.map('myMap', {
      key: 'X4yRaq0tGtRPAIMAmb0X7wpzW6dAGKQE',
      basePath: '../../../assets/tomtom',
      center: [lat, long],
      zoom: 15
    });

    var title = 'Vous';
    var marker = tomtom.L.marker(new tomtom.L.LatLng(lat, long), {title: title});
    marker.bindPopup(title);
    map.addLayer(marker);
    this.marker= marker;
    this.map= map;
  }

  /**
  *Remove the previous marker and add a new one with the new location on the map
  *@param{string} lat
  *@param{string} long
  *@param{object} map
  */
  maping2(lat, long, map){
    map.removeLayer(this.marker);
    var title = 'Vous';
    var marker = tomtom.L.marker(new tomtom.L.LatLng(lat, long), {title: title});
    marker.bindPopup(title);
    map.addLayer(marker);
    this.marker= marker;
  }

  /**
  *Check frequently golocation from the database in cas of changement [getUsersId]{@link Tab3Page.html#getUsersId}
  */
  beAware(){
    const watch = this.geolocation.watchPosition({enableHighAccuracy: true, timeout: 1000}).subscribe(position =>{
      this.getUsersId();
    });
  }

  /**
  *Function that watch frequently the location of the user's device
  *
  *It save the location into the data base with [positionSend]{@link Tab3Page.html#positionSend}
  *
  *And it goes to [maping]{@link Tab3Page.html#maping} the first time to initialise the map
  *and to [maping2]{@link Tab3Page.html#maping2} next to add the user's marker to the map
  */
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

  /**
  *Save location of the user in data base [sendPosition]{@link ../injectables/PositionService.html#sendPosition}
  */
  positionSend(lat, long){
    this.id = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
    this.posApi.sendPosition(lat, long, this.id).subscribe((response)=>{
      console.log(response);
    });
  }

  /**
  *Get id of the driver bound to the userIndex [getDriverbdd]{@link ../injectables/PositionService.html#getDriverbdd}
  *
  *Then get the position of that driver [getPosition]{@link Tab3Page.html#getPosition}
  */
  getDriverId(){
    let idTour: any = this.route.snapshot.paramMap.get('idTour');
    idTour = parseInt(idTour);
    this.trajet.idTour = idTour;
    this.posApi.getDriverbdd(this.trajet).then((response)=>{
      console.log(response);
      this.getPosition(response);
    });
  }

/**
*Get id of all user involved in a ride [getTrajetAllbdd]{@link ../injectables/TrajetData.html#getTrajetAllbdd}
*then [getPosition]{@link Tab3Page.html#getPosition}
*/
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

  /**
  *Get location of users [getPositionbdd]{@link ../injectables/PositionService.html#getPositionbdd}
  *and show it on the map [maping3]{@link Tab3Page.html#maping3}
  */
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

/**
*Add the marker of a user on the map
*@param {string}lat
*@param{string} long
*@param{object}map
*@param{string} name
*/
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

  /**
  *Function that send the user on the previous page
  */
  goBack(){
    let bddId: any = this.route.snapshot.paramMap.get('bddId');
    bddId=parseInt(bddId);
    this.defaultHref=this.defaultHref+bddId;
    console.log("hey"+this.defaultHref)
    this.router.navigateByUrl(this.defaultHref);
  }

}
