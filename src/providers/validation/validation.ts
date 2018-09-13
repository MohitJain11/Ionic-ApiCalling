import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ValidationProvider {

  constructor(public http: Http) {
    console.log('Hello ValidationProvider Provider');
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
        'required': 'Required',
        'mobile': 'Required',
        'invalidCreditCard': 'Is invalid credit card number',
        'invalidEmailAddress': 'Invalid email address',
        'invalidMobile': 'Mobile number should be 10 character long.',
        'invalidPassword': 'Invalid password. Password must be at least 8 characters long, and contain a number.',
        'invalidConfirmPassword': 'Confirm password value does not match to Password',
        'minlength': `Minimum length ${validatorValue.requiredLength}`,
        'invalidname': 'Name should be atleast 4 character long.',
        'invalidFixLength': `Length should be equal to ${validatorValue}`
    };

    return config[validatorName];
}

  fixedLengthValidator(val) {
    return (control: FormControl) => {
      if (control.value == "") {
        return null;
      }
      return control.value.length == val ? null : { 'invalidFixLength': val }
    }
  }

  NameValidator(control) {
   
    if (control.value.match(/[a-zA-Z]{4,20}?/)) {
      return null;
    } else {
      return { 'invalidname': true };
    }
  }

  emailValidator(control) {
    if (control.value == "") {
      return null;
    }
    
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value == "") {
      return null;
    }
    if (control.value.match(/(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,100}/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  } 

  confirmPasswordValidator(control) {
    console.log(control.value.password);
    console.log(control.value.re_password);
    if (control.value.password == control.value.re_password) {
      return null

    }
  }


}
