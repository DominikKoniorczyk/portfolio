import { Component } from '@angular/core';
import { HeaderComp } from '../header-comp/header-comp';

@Component({
  selector: 'app-hero',
  imports: [HeaderComp],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
