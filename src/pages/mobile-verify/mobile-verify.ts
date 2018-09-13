import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OtpProvider } from '../../providers/otp/otp';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { VerifyOtpPage } from '../verify-otp/verify-otp';
import { LoadingProvider } from '../../providers/loading/loading';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
@IonicPage()
@Component({
  selector: 'page-mobile-verify',
  templateUrl: 'mobile-verify.html',
})
export class MobileVerifyPage {

  mobileNumber: any;
  otpvar: any;
  otpNumber: any;
  sendOtpForm: FormGroup;
  error = "";
  users: any;
  constructor(public navCtrl: NavController,
    private googlePlus: GooglePlus,
    private formBuilder: FormBuilder,
    public loadingProvider: LoadingProvider,
    public changeDetector: ChangeDetectorRef,
    private fb: Facebook,
    public navParams: NavParams,
    public otpProvider: OtpProvider) {
    this.sendOtpForm = this.formBuilder.group({
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobileVerifyPage');
  }

  sendOtp() {
    console.log('mobile ' + this.mobileNumber);
    var param = {
      MobileNo: this.mobileNumber
    }
    this.loadingProvider.loadingStart();
    this.otpProvider.sendOtp(param).then((result) => {
      console.log('result ' + JSON.stringify(result));
      this.otpvar = result;
      this.loadingProvider.loadingClose();
      if (!this.otpvar.IsExceptionOccured) {
        console.log('ReturnValue ' + this.otpvar.IsExceptionOccured);
        //this.otpNumber = this.otpvar.ReturnValue;
        this.navCtrl.push(VerifyOtpPage, { otpResponse: this.otpvar.ReturnValue });
      }
      else {
        this.error = this.otpvar.ErrorMessage;
      }
    }).catch((err)=>{
      this.loadingProvider.loadingClose();
      console.log('error1 '+ err);
    })
  }

  refresh() {
    this.changeDetector.detectChanges();
  }

  loginGoogle(){
    this.googlePlus.login({})
    .then(res => {
      var resDetail = res;
      this.navCtrl.push(HomePage,{loginDetail: resDetail, goMethod: 1});
    })
    .catch(err => alert('error '+JSON.stringify(err)));
  }

  loginFacebook(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.getUserDetail(res.authResponse.userID);
          
          
        } else {
          alert('not connected');
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
        console.log('user '+JSON.stringify(this.users));
        this.navCtrl.push(HomePage,{fbUser: this.users, fbMethod : 1});
      })
      .catch(e => {
        console.log(e);
      });
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }


}
