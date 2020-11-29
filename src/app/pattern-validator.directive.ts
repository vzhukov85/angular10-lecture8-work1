import { Directive, Input } from '@angular/core';
import {
  FormControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[patternValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: PatternValidatorDirective,
      multi: true,
    },
  ],
})
export class PatternValidatorDirective implements Validator {
  @Input('patternValidator') pattern: string;

  constructor() {}

  validate = (control: FormControl): ValidationErrors | null => {
    return this.internalValidator(control);
  }

  private internalValidator(control: FormControl): ValidationErrors | null {
    if (!this.pattern) {
      return null;
    }
    const patternRegExp = new RegExp(this.pattern);
    const phoneValidators = control.value;
    const obj = {
      phoneValidators,
      phonePattern: this.pattern,
    };
    if (!patternRegExp.test(phoneValidators)) {
      return obj;
    }
    return null;
  }
}
