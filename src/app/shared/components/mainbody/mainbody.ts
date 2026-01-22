import { Component } from '@angular/core';
import { Hero } from '../../../hero/hero';
import { AboutMe } from '../../../about-me/about-me';

@Component({
  selector: 'app-mainbody',
  imports: [Hero, AboutMe],
  templateUrl: './mainbody.html',
  styleUrl: './mainbody.scss',
})
export class Mainbody {

}
