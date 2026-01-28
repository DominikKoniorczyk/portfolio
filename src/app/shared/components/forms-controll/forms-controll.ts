import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimatedButton } from '../animated-button/animated-button';
import emailValidator from '../../services/custom-validators';
import { _, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forms-controll',
  imports: [ReactiveFormsModule, AnimatedButton, TranslatePipe],
  templateUrl: './forms-controll.html',
  styleUrl: './forms-controll.scss',
})
export class FormsControll {
  translate = inject(TranslateService);
  namePlaceHolder!: string;

  constructor(translate: TranslateService){
    translate.use('en');
  }

  ngOnInit(){
    this.translate.get(['contact.formular.namePlaceholder', 'contact.formular.submit'])
      .subscribe(translations => {
        this.namePlaceHolder = translations['contact.formular.namePlaceholder'];
      });
  }


  userForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(5)] }),
    mail: new FormControl('', { validators: [emailValidator(), Validators.required] }),
    message: new FormControl('', { validators: [Validators.required, Validators.minLength(30)] }),
    policy: new FormControl('', { validators: [Validators.required] })
  });

  onNameInputFocus() {

  }

  formSubmit() {
    console.log(this.userForm.get('mail')?.valid);
  }
}
