import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the OtpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OtpProvider {
  apiUrl = "http://103.89.253.21:8113/api/signup";
  options;
  data;
  constructor(public http: Http) {
    console.log('Hello OtpProvider Provider');
  }
   
  getRequestHeader(){
		var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers: headers });
	}	
  execute(uri,data){
    let options = this.getRequestHeader();
    return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'/'+uri, JSON.stringify(data),options)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      }, (err) => {
        reject(err);
      });
		});
  }

  sendOtp(mobile){
   return this.execute('GenerateOtp',mobile);
  }

  verifyOtp(otp){
    return this.execute('VerifyOtp',otp);
  }

}
