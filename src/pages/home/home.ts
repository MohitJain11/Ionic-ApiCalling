import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { AppUserProvider } from '../../providers/app-user/app-user';
import { LoadingProvider } from '../../providers/loading/loading';
import { MobileVerifyPage } from '../mobile-verify/mobile-verify';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  appUserData: any;
  fbUser: any;
  googleLogedDetail;
  fbMethod = 0;
  goMethod = 0;

  firstName = "";
  email = "";
  constructor(public navCtrl: NavController,
    private fb: Facebook,
    private changeDetectRef: ChangeDetectorRef,
    public storage: Storage,
    public loadingProvider: LoadingProvider,
    public appUserProvider: AppUserProvider,
    private localDataProvider: LocalDataProvider,
    private googlePlus: GooglePlus,
    public navParams: NavParams) {
    var me = this;
    if (localDataProvider.getIsLoggedIn()) {
      console.log('calling');
      this.storage.get('userId')
        .then((appUserId) => {
          var param = {
            AppUserId: appUserId
          }
          this.loadingProvider.loadingStart();
          me.appUserProvider.AppUserLogin(param).then((appUserResult) => {
            this.loadingProvider.loadingClose();
            me.appUserData = appUserResult;
            console.log(me.appUserData.ReturnValue.UserFirstName);
            me.firstName = me.appUserData.ReturnValue.UserFirstName;
            me.email = me.appUserData.ReturnValue.Email;
            console.log(me.appUserData.ReturnValue.Email);
            me.changeDetectRef.detectChanges();
          }).catch((err) => {
            console.log('err ' + err);
          })
        }).catch((error) => {
          console.log('error ' + error);
        })
    }
    else {
      this.appUserData = this.navParams.data.AppUserData;
      me.firstName = me.appUserData.ReturnValue.UserFirstName;
      me.email = me.appUserData.ReturnValue.Email;
      if (this.navParams.data.fbMethod == 1) {
        this.fbUser = this.navParams.data.fbUser;
        this.fbMethod = 1;
      }
      if (this.navParams.data.goMethod == 1) {
        this.googleLogedDetail = this.navParams.data.loginDetail;
        this.goMethod = 1;
      }
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logout() {

    if (this.fbMethod == 1) {
      this.fb.logout();
      this.fbMethod = 0;
    }
    if (this.goMethod == 1) {
      this.googlePlus.logout();
      this.goMethod = 0;
    }

    this.storage.remove('userId').then(() => {
      console.log('remove success');
      this.localDataProvider.setIsLoggedIn(false);
      this.navCtrl.setRoot(MobileVerifyPage);
      this.navCtrl.popToRoot();
    }).catch((error)=>{
      console.log('error '+error);
    })


  }


}
