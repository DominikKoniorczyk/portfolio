import { Component } from '@angular/core';
import { Hero } from '../../../hero/hero';
import { AboutMe } from '../../../about-me/about-me';
import { Technologies } from '../../../technologies/technologies';
import { Projects } from '../../../projects/projects';
import { ProjectsDialog } from '../projects-dialog/projects-dialog';

@Component({
  selector: 'app-mainbody',
  imports: [Hero, AboutMe, Technologies, Projects, ProjectsDialog],
  templateUrl: './mainbody.html',
  styleUrl: './mainbody.scss',
})
export class Mainbody {

}
