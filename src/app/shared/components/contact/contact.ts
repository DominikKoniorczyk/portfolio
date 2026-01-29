import { Component } from '@angular/core';
import { FormsControll } from '../forms-controll/forms-controll';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [FormsControll, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

}
