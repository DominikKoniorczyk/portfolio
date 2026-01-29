import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  imports: [TranslatePipe],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {

}
