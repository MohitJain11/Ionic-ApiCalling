import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalDataProvider {

  isLoggedIn = false;
  constructor(public http: Http) {
    console.log('Hello LocalDataProvider Provider');
  }

  getIsLoggedIn(){
    return this.isLoggedIn;
  }

  setIsLoggedIn(isLoggedIn){
    this.isLoggedIn = isLoggedIn;
  }

}
