import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  loading;
  constructor(public http: Http,
    public loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  loadingStart() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  loadingClose() {
    this.loading.dismiss();
  }

}
