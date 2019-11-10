import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class UserData {
  _validatedTrajets: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public events: Events,
    public storage: Storage
  ){}

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return this.events.publish('user:login');
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      this.events.publish('user:logout');
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  hasValidate(sessionId: string): boolean {
  return (this._validatedTrajets.indexOf(sessionId) > -1);
  }

  addValidation(sessionId: string): void {
    this._validatedTrajets.push(sessionId);
  }


}
