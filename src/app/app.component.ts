import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { MobileVerifyPage } from '../pages/mobile-verify/mobile-verify';
import { HomePage } from '../pages/home/home';
import { LocalDataProvider } from '../providers/local-data/local-data';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private nativeStorage: Storage,
    private localDataProvider: LocalDataProvider,
    private splashScreen: SplashScreen) {
    this.loadPage();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  loadPage() {
    this.nativeStorage.get('userId')
      .then((userId) => {
        if (userId) {
          this.localDataProvider.setIsLoggedIn(true);
          this.rootPage = HomePage;
          
        }
        else
        {
          this.localDataProvider.setIsLoggedIn(false);
          this.rootPage = MobileVerifyPage;
        }
         
        
      })
  }

}

