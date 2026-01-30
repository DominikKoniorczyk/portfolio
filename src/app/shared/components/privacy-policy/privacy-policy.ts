import { TranslatePipe } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { HeaderComp } from '../../../header-comp/header-comp';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-privacy-policy',
  imports: [TranslatePipe, HeaderComp, Footer],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {

}
