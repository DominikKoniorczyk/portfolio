import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimatedButton } from '../animated-button/animated-button';
import emailValidator from '../../services/custom-validators';
import { _, LangChangeEvent, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

interface Placeholders {
  name: string,
  email: string,
  message: string,
}

@Component({
  selector: 'app-forms-controll',
  imports: [ReactiveFormsModule, AnimatedButton, TranslatePipe, RouterLink, FormsModule],
  templateUrl: './forms-controll.html',
  styleUrl: './forms-controll.scss',
})
export class FormsControll {
  translate = inject(TranslateService);
  private langChangeSub!: Subscription;
  http = inject(HttpClient);
  stringsToGet: string[] = [
    'contact.formular.namePlaceholder',
    'contact.formular.emailPlaceholder',
    'contact.formular.messagePlaceholder',
    'contact.formular.nameError',
    'contact.formular.emailError',
    'contact.formular.messageError',
  ];
  sendMessage: string = "";
  mailTest: boolean = true;
  currentPlaceHolder: Placeholders = { name: "", email: "", message: "" };
  defaultPlaceHolder: Placeholders = { name: "", email: "", message: "" };
  error: Placeholders = { name: "", email: "", message: "" };
  lastEntered: Placeholders = { name: "", email: "", message: "" };
  contactData = {
    name: '',
    email: '',
    message: '',
  };
  post = {
    endPoint: 'https://dominik-koniorczyk.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDivElement>;

  /**
   * Reactive form group for user input, including validation rules.
   */
  userForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    mail: new FormControl('', { validators: [emailValidator(), Validators.required] }),
    message: new FormControl('', { validators: [Validators.required, Validators.minLength(30)] }),
    policy: new FormControl(false, { validators: [Validators.requiredTrue] })
  });

  constructor(translate: TranslateService) {
    this.subscripeAllInputFields();
    setTimeout(() => {
      this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.handleLanguageChange(event.lang);
      });
    })
  }

  /**
   * Updates the placeholder and error messages for a form based on the selected language.
   * Retrieves translations for the configured strings and updates the corresponding fields.
   *
   * @param {string} lang - The language code to switch to (e.g., 'en', 'de').
   * @returns {void}
   */
  handleLanguageChange(lang: string) {
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
   * Subscripe the change on input fields. Set the values of the corresponding data in contactData.
   *
   * @returns {void}
   */
  subscripeAllInputFields() {
    this.userForm.get('name')?.valueChanges.subscribe(value => {
      this.contactData.name = value!;
    });
    this.userForm.get('mail')?.valueChanges.subscribe(value => {
      this.contactData.email = value!;
    });
    this.userForm.get('message')?.valueChanges.subscribe(value => {
      this.contactData.message = value!;
    });
  }

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
   * Handles the form submission.
   * If the form is valid and not in test mode, sends the contact data via HTTP POST.
   * Resets the form and shows an alert on success, logs errors on failure.
   * If in test mode, the form is simply reset without sending.
   *
   * @returns {void}
   */
  onSubmit() {
    if (this.userForm.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.userForm.reset();
            this.responseMessage("");
          },
          error: (error) => {
            console.error(error);
            this.responseMessage(error);
          },
          complete: () => this.openResponeDialog(),
        });
    } else if (this.userForm.valid && this.mailTest) {
      this.responseMessage("");
      this.userForm.reset();
    }
  }

  /**
   * Sets the response message that should be shown to the user.
   * If the provided message is empty, a default "thank you" translation will be loaded instead.
   * Afterwards, the response dialog will be opened.
   *
   * @param {string} message - The message to display. If empty, a translated default message will be used.
   * @returns {void}
   */
  responseMessage(message: string) {
    if (message == "") {
      this.translate.get(['contact.formular.thankYou'])
        .subscribe(translations => {
          this.sendMessage = translations['contact.formular.thankYou']
        });
    } else {
      this.sendMessage = message;
    }
    console.log(this.sendMessage);

    this.openResponeDialog();
  }

  /**
  * Opens the response dialog by removing the hidden CSS class
  * and schedules it to close automatically after 5 seconds.
  *
  * @returns {void}
  */
  openResponeDialog() {
    this.dialog.nativeElement.classList.remove('d_none');
    setTimeout(() => this.closeResponseDialog(), 5000)
  }

  /**
   * Closes the response dialog by adding the hidden CSS class.
   *
   * @returns {void}
   */
  closeResponseDialog() {
    this.dialog.nativeElement.classList.add('d_none');
  }

  /**
   * Angular lifecycle hook called just before the component is destroyed.
   * Cleans up subscriptions to prevent memory leaks.
   *
   * @returns {void}
   */
  ngOnDestroy() {
    this.langChangeSub.unsubscribe();
  }
}
