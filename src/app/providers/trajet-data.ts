import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {TrajetOptions} from '../interfaces/trajet-options';
import { HttpClient , HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TrajetData {
  data: any;

  //  Url= "http://bdd.easy-carpool.com/";
  Url = "http://localhost:8080/";
  trajetServiceUrl = this.Url +"trajet";
  trajAllServiceUrl = this.Url +"trajetAll";
  getCodeServiceUrl = this.Url +"getCode";
  trajConductServiceUrl = this.Url +"trajetConduct";
  validateServiceUrl = this.Url +"validate";
  trajetColisServiceURL = this.Url +"trajetColis";
  CommentServiceURL = this.Url +"comment";

  /**
  *@ignore
  */
  constructor( public http: HttpClient) {}

  /**
  *Get code of the ride from the data base
  *@param{TrajetOptions}data
  */
  getCodebdd(data: TrajetOptions){
    return this.http.post(this.getCodeServiceUrl, data);
  }

  /**
  *Send to the database the complainning message of the traveller
  *@param{string}comment
  *@param{number}id
  */
  sendCommentbdd(comment, id){
    console.log("comment:"+ comment + " id : "+ id)
    let parameters= new HttpParams().set('comment', comment).append('id', id);
    console.log(parameters);

    return new Promise((resolve, reject) => {
      this.http.get(this.CommentServiceURL, {params:parameters}).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.log('Error occured sending comment:' + err);
          reject();
        }
      );
    });
  }

  /**
  *Update status of a ride to 2 as it is considered as done
  *@param{TrajetOptions}data
  */
  validateStatusbdd(data: TrajetOptions){
    console.log(data)
    return new Promise((resolve, reject)=> {
      this.http.post(this.validateServiceUrl, data).subscribe(res=>{
        resolve(res);
      },
    err => {
      console.log('Error occured: ' + err);
      reject();
    });
  });
  }

  /**
  *Get informations about a ride from the database
  *@param{TrajetOptions}data
  */
  getTrajetbdd(data: TrajetOptions){
    return new Promise((resolve, reject)=> {
      this.http.post(this.trajetServiceUrl, data).subscribe(res=>{
        resolve(res);
      },
    err => {
      console.log('Error occured: ' + err);
      reject();
    });
  });
  }

  /**
  *Get all the ride's informations that are relatives to the same round
  *@param{TrajetOptions}data
  */
    getTrajetAllbdd(data: TrajetOptions){
      return new Promise((resolve, reject)=> {
        this.http.post(this.trajAllServiceUrl, data).subscribe(res=>{
          resolve(res);
        },
      err => {
        console.log('Error occured: ' + err);
        reject();
      });
    });
    }

    /**
    *Get informations about a ride that a drive has in charge
    *@param{TrajetOptions}data
    */
    getTrajetConductbdd(data: TrajetOptions){
      return new Promise((resolve, reject)=> {
        this.http.post(this.trajConductServiceUrl, data).subscribe(res=>{
          resolve(res);
        },
      err => {
        console.log('Error occured: ' + err);
        reject();
      });
    });
    }

  /**
  *Get informations about a ride that is relative to a package
  *@param{TrajetOptions}data
  */
  getTrajetColisbdd(data: TrajetOptions){
    return new Promise((resolve, reject) => {
      this.http.post(this.trajetColisServiceURL, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.log('Error occured in getTrajetColis:' + err);
          reject();
        }
      );
    });
  }
}
