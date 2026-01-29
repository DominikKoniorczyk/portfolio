import { Component } from '@angular/core';
import { HeaderComp } from '../header-comp/header-comp';
import { Title } from '../title/title';
import { HeroBanner } from './../hero-banner/hero-banner';
import { ScrollDown } from '../scroll-down/scroll-down';

@Component({
  selector: 'app-hero',
  imports: [HeaderComp, Title, HeroBanner, ScrollDown],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
