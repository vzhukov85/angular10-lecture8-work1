import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatternValidatorDirective } from './pattern-validator.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PatternValidatorDirective],
})
export class AppComponent {
  myForm: FormGroup = new FormGroup({
    userPhone: new FormControl('123456789', [
      this.patternValidator.validate,
      Validators.required,
    ]),
    secondPhone: new FormControl('123456789', []),
  });

  constructor(private patternValidator: PatternValidatorDirective) {
    this.patternValidator.pattern = '[0-9]{11}';
  }

  click() {
    console.log(this.myForm);
  }
}
