import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimatedButton } from '../animated-button/animated-button';
import emailValidator from '../../services/custom-validators';
import { _, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

interface Placeholders {
  name: string,
  email: string,
  message: string,
}

@Component({
  selector: 'app-forms-controll',
  imports: [ReactiveFormsModule, AnimatedButton, TranslatePipe, RouterLink],
  templateUrl: './forms-controll.html',
  styleUrl: './forms-controll.scss',
})
export class FormsControll {
  translate = inject(TranslateService);
  stringsToGet: string[] = [
    'contact.formular.namePlaceholder',
    'contact.formular.emailPlaceholder',
    'contact.formular.messagePlaceholder',
    'contact.formular.nameError',
    'contact.formular.emailError',
    'contact.formular.messageError',
  ];
  test!: string;
  currentPlaceHolder: Placeholders = { name: "", email: "", message: "" };
  defaultPlaceHolder: Placeholders = { name: "", email: "", message: "" };
  error: Placeholders = { name: "", email: "", message: "" };
  lastEntered: Placeholders = { name: "", email: "", message: "" };

  constructor(translate: TranslateService) {
    translate.use('en');
  }

  /**
   * Angular lifecycle hook that is called once the component is initialized.
   * Fetches translation strings and sets the default placeholders and error messages.
   *
   * @returns {void}
   */
  ngOnInit() {
    this.translate.get(this.stringsToGet)
      .subscribe(translations => {
        this.defaultPlaceHolder.name = translations[this.stringsToGet[0]];
        this.defaultPlaceHolder.email = translations[this.stringsToGet[1]];
        this.defaultPlaceHolder.message = translations[this.stringsToGet[2]];
        this.error.name = translations[this.stringsToGet[3]];
        this.error.email = translations[this.stringsToGet[4]];
        this.error.message = translations[this.stringsToGet[5]];
        this.currentPlaceHolder = this.defaultPlaceHolder;
      });
  }

  /**
   * Reactive form group for user input, including validation rules.
   */
  userForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    mail: new FormControl('', { validators: [emailValidator(), Validators.required] }),
    message: new FormControl('', { validators: [Validators.required, Validators.minLength(30)] }),
    policy: new FormControl(false, { validators: [Validators.requiredTrue] })
  });

  /**
   * Restores the last entered name value when the name input gains focus.
   *
   * @returns {void}
   */
  onNameFocus() {
    if (this.lastEntered.name != '') {
      this.userForm.get('name')?.setValue(this.lastEntered.name);
    }
  }

  /**
   * Clears the name input and shows the error placeholder if the name is invalid on blur.
   *
   * @returns {void}
   */
  onNameBlur() {
    if (!this.userForm.get('name')?.valid) {
      this.lastEntered.name = this.userForm.get('name')?.value?.toString() ?? '';
      this.userForm.get('name')?.setValue("");
      this.currentPlaceHolder.name = this.error.name;
    }
  }

  /**
   * Restores the last entered email value when the email input gains focus.
   *
   * @returns {void}
   */
  onEmailFocus() {
    if (this.lastEntered.email != '') {
      this.userForm.get('mail')?.setValue(this.lastEntered.email);
    }
  }

  /**
   * Clears the email input and shows the error placeholder if the email is invalid on blur.
   *
   * @returns {void}
   */
  onEmailBlur() {
    if (!this.userForm.get('mail')?.valid) {
      this.lastEntered.email = this.userForm.get('mail')?.value?.toString() ?? '';
      this.userForm.get('mail')?.setValue("");
      this.currentPlaceHolder.email = this.error.email;
    }
  }

  /**
   * Restores the last entered message value when the message input gains focus.
   *
   * @returns {void}
   */
  onMessageFocus() {
    if (this.lastEntered.message != '') {
      this.userForm.get('message')?.setValue(this.lastEntered.message);
    }
  }

  /**
   * Clears the message input and shows the error placeholder if the message is invalid on blur.
   *
   * @returns {void}
   */
  onMessageBlur() {
    if (!this.userForm.get('message')?.valid) {
      this.lastEntered.message = this.userForm.get('message')?.value?.toString() ?? '';
      this.userForm.get('message')?.setValue("");
      this.currentPlaceHolder.message = this.error.message;
    }
  }

  /**
   * Dynamically adjusts the height of a textarea element to fit its content.
   * Limits the maximum height and enables vertical scrolling if necessary.
   *
   * @param {Event} event - The input event triggered by the textarea element.
   * @returns {void}
   */
  adjustHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const maxHeight = 200;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  /**
   * Handles form submission.
   * Currently logs the validity of the email field to the console.
   *
   * @returns {void}
   */
  formSubmit() {
    console.log(this.userForm.get('mail')?.valid);
  }
}
