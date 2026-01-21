import { Component } from '@angular/core';
import { HeaderComp } from '../header-comp/header-comp';
import { Title } from '../title/title';
import { HeroBannerComponent } from '../hero-banner/hero-banner';

@Component({
  selector: 'app-hero',
  imports: [HeaderComp, Title, HeroBannerComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
