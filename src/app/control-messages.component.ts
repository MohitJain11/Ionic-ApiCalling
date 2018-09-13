import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationProvider} from '../providers/validation/validation';

@Component({
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor(public validationProvier: ValidationProvider) { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)) {
        return ValidationProvider.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}