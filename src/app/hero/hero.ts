import { Component } from '@angular/core';
import { HeaderComp } from '../header-comp/header-comp';
import { Title } from '../title/title';
import { HeroBanner } from './../hero-banner/hero-banner';
import { ScrollDown } from '../scroll-down/scroll-down';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [HeaderComp, Title, HeroBanner, ScrollDown, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
