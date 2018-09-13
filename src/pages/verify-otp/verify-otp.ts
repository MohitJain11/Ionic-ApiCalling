import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OtpProvider } from '../../providers/otp/otp';
import { AppUserProvider } from '../../providers/app-user/app-user';
import { HomePage } from '../home/home';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-verify-otp',
  templateUrl: 'verify-otp.html',
})
export class VerifyOtpPage {

  verifyOtpForm: FormGroup;
  otpNumber: any = [];
  otpResponse: any;
  error = "";
  appUserLoginResponse: any;
  enteredOtpNumber: any = [];
  verifyResponse: any;
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private nativeStorage: Storage,
    public loadingProvider: LoadingProvider,
    private formBuilder: FormBuilder,
    public appUserProvider: AppUserProvider,
    public otpProvider: OtpProvider) {
    this.verifyOtpForm = this.formBuilder.group({
      otp1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    });
    //console.log('otpResponse '+this.navParams.data.otpResponse);
    this.otpResponse = this.navParams.data.otpResponse;
    console.log('otp ' + this.otpResponse.Otp);
    var otp = this.otpResponse.Otp.toString();
    for (var i = 0; i < otp.length; i++) {
      this.otpNumber.push(+otp.charAt(i));
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyOtpPage');

  }
  verifyOtp() {
    var enteredOtp = this.enteredOtpNumber[0] + this.enteredOtpNumber[1] + this.enteredOtpNumber[2] + this.enteredOtpNumber[3];
    console.log('enter ' + enteredOtp);
    var param = {
      MobileNo: this.otpResponse.MobileNo,
      Otp: enteredOtp
    }
    this.loadingProvider.loadingStart();
    this.otpProvider.verifyOtp(param).then((result) => {

      this.verifyResponse = result;
      if (this.verifyResponse.status) {
        var param = {
          MobileNo: this.otpResponse.MobileNo
        }
        this.appUserProvider.AppUserLogin(param).then((appUserresult) => {

          this.appUserLoginResponse = appUserresult;
          if (!this.appUserLoginResponse.IsExceptionOccured) {
            this.nativeStorage.set('userId', this.appUserLoginResponse.ReturnValue.AppUserId )
              .then(() => {
                this.loadingProvider.loadingClose();
                this.navCtrl.push(HomePage, { AppUserData: appUserresult });
                this.presentToast();
              }).catch((error) => {
                this.loadingProvider.loadingClose();
                console.log('errorlocalStroage ' + error);
              })
          }
          else {
            this.loadingProvider.loadingClose();
            this.error = this.appUserLoginResponse.Message;
          }

        }).catch((err) => {
          this.loadingProvider.loadingClose();
          alert("error " + err);
        })
      }
      else {
        this.loadingProvider.loadingClose();
        this.error = this.verifyResponse.ErrorMessage;
      }
    })
  }

  next(el, prev_el, i) {
    if (this.enteredOtpNumber[i])
      el.setFocus();
    else
      prev_el.setFocus();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was loged successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
