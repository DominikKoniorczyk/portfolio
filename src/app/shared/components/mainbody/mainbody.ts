import { Component } from '@angular/core';
import { Hero } from '../../../hero/hero';
import { AboutMe } from '../../../about-me/about-me';
import { Technologies } from '../../../technologies/technologies';

@Component({
  selector: 'app-mainbody',
  imports: [Hero, AboutMe, Technologies],
  templateUrl: './mainbody.html',
  styleUrl: './mainbody.scss',
})
export class Mainbody {

}
