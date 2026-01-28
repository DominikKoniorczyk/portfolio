import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value == name ? { forbiddenName: { value: control.value } } : null;
  };
}

export default function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>{
    const email: string = control.value;
    if(email){
      const domain: string = email.substring(email.lastIndexOf('@') + 1);
      if(domain.includes(".")){
        console.log((domain.substring(domain.lastIndexOf(".") + 1)).length >= 2, "hallo");

        return domain.substring(domain.lastIndexOf(".") + 1).length >= 2 ? {  } : null;
      }
    }
    return {forbiddenName: {  }};
  }
}

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {

}
