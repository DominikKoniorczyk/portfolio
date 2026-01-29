import { Component } from '@angular/core';
import { HeaderComp } from '../header-comp/header-comp';
import { Footer } from '../shared/components/footer/footer';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  imports: [HeaderComp, Footer, TranslatePipe],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss',
})
export class Imprint {

}
