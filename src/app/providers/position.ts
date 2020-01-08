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
getDriverServiceUrl= this.Url +  "getDriver";
getPositionServiceUrl= this.Url +  "getPosition";

/**
*@ignore
*/
constructor(private http : HttpClient) { }

  /**
  *Update data base with the new location of the user
  *@param{number} lat
  *@param{number} long
  *@param{number} idUser
  */
  sendPosition(lat, long, idUser){
    console.log(typeof lat, typeof idUser)
    let parameters= new HttpParams().set('lat', lat).append('long', long).append('idUser', idUser);
    console.log("posi"+ parameters)
    return this.http.get(this.positionServiceUrl, {params:parameters, responseType : 'text'});
  }

  /**
  *Find witch user is the driver of a round
  *@param{TrajetOptions}data
  */
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

  /**
  *Get location informations of a user
  *@param{TrajetOptions}data
  */
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
