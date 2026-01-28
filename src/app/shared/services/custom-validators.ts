import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>{
    const email: string = control.value;
    if(email){
      const domain: string = email.substring(email.lastIndexOf('@') + 1);
      if(domain.includes(".")){
        return domain.substring(domain.lastIndexOf(".") + 1).length >= 2 ? null : { email : true };
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
