import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Returns a custom Angular validator function for validating email addresses.
 *
 * The validator checks that the email contains a domain with a dot (`.`) and that the
 * top-level domain (TLD) is at least 2 characters long. If the email is invalid,
 * it returns a validation error object; otherwise, it returns `null`.
 *
 * @returns {ValidatorFn} A validator function that can be used with Angular form controls.
 */
export default function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email: string = control.value;
    if (email) {
      const domain: string = email.substring(email.lastIndexOf('@') + 1);
      if (domain.includes(".")) {
        return domain.substring(domain.lastIndexOf(".") + 1).length >= 2 ? null : { email: true };
      }
    }
    return { forbiddenName: {} };
  }
}

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {

}
