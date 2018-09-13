import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidationProvider } from '../../providers/validation/validation';
import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signup: FormGroup;
  rePasswordError;
  constructor(public navCtrl: NavController,
    public validationProviders: ValidationProvider,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
    this.initializeLoginForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  initializeLoginForm() {
		//this.number = this.share.getNumber();
		this.signup = this.formBuilder.group({
			MobileNo: ['', [Validators.required, this.validationProviders.fixedLengthValidator(10)]],
			UserName: ['', [Validators.required, this.validationProviders.NameValidator]],
      Email: ['',[Validators.required, this.validationProviders.emailValidator]],
      password: ['',[Validators.required, this.validationProviders.passwordValidator]],
      re_password: ['',Validators.required]
		},{validator: this.matchingPasswords('password', 're_password')});
	}

  onsubmit(value){
    console.log('signup');
    var appUserData = {
      ReturnValue : {
        UserFirstName: value.Email,
        Email: value.UserName,
      }
    }
    console.log('signup');
    this.navCtrl.push(HomePage,{AppUserData: appUserData});
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      this.rePasswordError = "";
      if (password.value !== confirmPassword.value) {
        this.rePasswordError = "Password mismatch";
        return {
          mismatchedPasswords: true,
        };
      }
    }
  }
}
