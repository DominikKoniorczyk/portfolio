import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimatedButton } from '../animated-button/animated-button';
import emailValidator, { CustomValidators } from '../../services/custom-validators';

@Component({
  selector: 'app-forms-controll',
  imports: [ReactiveFormsModule, AnimatedButton],
  templateUrl: './forms-controll.html',
  styleUrl: './forms-controll.scss',
})
export class FormsControll {
  message = new FormControl('message');

  userForm = new FormGroup({
    name: new FormControl('name', { validators: [Validators.required, Validators.minLength(5)] }),
    mail: new FormControl('email', { validators: [emailValidator() ] })
  });

  formSubmit(){
    console.log(this.userForm.get('mail')?.valid);
  }
}
