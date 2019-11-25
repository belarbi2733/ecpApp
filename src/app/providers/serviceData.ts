import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiceData{
  codeServiceUrl= "http://localhost:8080/code";
  constructor( private http : HttpClient){  }

  getCode(){
    return this.http.get(this.codeServiceUrl);
  }
}
