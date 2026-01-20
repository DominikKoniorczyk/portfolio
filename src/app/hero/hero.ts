import { Component } from '@angular/core';
import { HeaderComp } from '../header-comp/header-comp';
import { Title } from '../title/title';

@Component({
  selector: 'app-hero',
  imports: [HeaderComp, Title],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
