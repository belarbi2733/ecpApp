import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {TrajetOptions} from '../interfaces/trajet-options';


@Injectable({
  providedIn: 'root'
})
export class PositionService {
  //  Url= "http://bdd.easy-carpool.com/";
Url = "http://localhost:8080/";
positionServiceUrl= this.Url +  "position";
AddpositionServiceUrl= this.Url +  "addposition";
getDriverServiceUrl= this.Url +  "getDriver";
getPositionServiceUrl= this.Url +  "getPosition";

constructor(private http : HttpClient) { }

  sendPosition(lat, long, idUser){
    let parameters= new HttpParams().set('lat', lat).append('long', long).append('idUser', idUser);
    console.log("posi"+ parameters)
    return this.http.get(this.positionServiceUrl, {params:parameters, responseType : 'text'});
  }

  getDriverbdd(data: TrajetOptions){
    console.log(data)
    return new Promise((resolve, reject) => {
      this.http.post(this.getDriverServiceUrl, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.log('Error occured in getIdDriver:' + err);
          reject();
        }
      );
    });
  }

  getPositionbdd(data: TrajetOptions){
    return new Promise((resolve, reject) => {
      this.http.post(this.getPositionServiceUrl, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.log('Error occured in getLatLong:' + err);
          reject();
        }
      );
    });
  }

}
