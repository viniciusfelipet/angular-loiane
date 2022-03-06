import { FormValidations } from './../form-validations/form-validations';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css'],
})
export class ErrorMsgComponent implements OnInit {
  //@Input() mostrarErro: boolean;
  //@Input() msgErro: string;

  @Input() control: any;
  @Input() label: string;

  showMessage: boolean = false;

  constructor() {}

  ngOnInit() {}

  get errorMessage() {
    let controlType = this.control as FormControl;

    for (const propertyName in controlType.errors) {
      if (
        controlType.errors.hasOwnProperty(propertyName) &&
        controlType.touched
      ) {
        const element = controlType.errors[propertyName];

        this.showMessage = true;

        return FormValidations.getErrorMsg(
          this.label,
          propertyName,
          controlType.errors[propertyName]
        );
      }
    }
    return (this.showMessage = false);
  }
}
