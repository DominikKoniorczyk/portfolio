import { Component } from '@angular/core';
import { Hero } from '../../../hero/hero';
import { AboutMe } from '../../../about-me/about-me';
import { Technologies } from '../../../technologies/technologies';
import { Projects } from '../../../projects/projects';

@Component({
  selector: 'app-mainbody',
  imports: [Hero, AboutMe, Technologies, Projects],
  templateUrl: './mainbody.html',
  styleUrl: './mainbody.scss',
})
export class Mainbody {

}
