import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { MyApp } from './app.component';
import { OtpProvider } from '../providers/otp/otp';
import { HttpModule } from '@angular/http'; 
import { MobileVerifyPage } from '../pages/mobile-verify/mobile-verify';
import { HomePage } from '../pages/home/home';
import { VerifyOtpPage } from '../pages/verify-otp/verify-otp';
import { AppUserProvider } from '../providers/app-user/app-user';
import { LoadingProvider } from '../providers/loading/loading';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';
import { LocalDataProvider } from '../providers/local-data/local-data';
import { ValidationProvider } from '../providers/validation/validation';
import { SignupPage} from '../pages/signup/signup';

import { ControlMessagesComponent } from './control-messages.component';  

@NgModule({
  declarations: [
    MyApp,
    MobileVerifyPage,
    HomePage,
    ControlMessagesComponent,
    SignupPage,
    VerifyOtpPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MobileVerifyPage,
    VerifyOtpPage,
    SignupPage,
    HomePage
  ],
  providers: [
    StatusBar,
    GooglePlus,
    Facebook,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OtpProvider,
    AppUserProvider,
    LoadingProvider,
    LocalDataProvider,
    ValidationProvider
  ]
})
export class AppModule {}
