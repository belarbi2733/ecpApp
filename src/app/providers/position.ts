import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
positionServiceUrl= "http://localhost:8080/position";
constructor(private httpPos : HttpClient) { }
  sendPosition(lat, long){
    let parameters= new HttpParams().set('lat', lat).append('long', long);
    return this.httpPos.get(this.positionServiceUrl, {params:parameters, responseType : 'text'});
  }
}
