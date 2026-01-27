import { Project } from './../../services/projects.service';
import { Component } from '@angular/core';
import { Hero } from '../../../hero/hero';
import { AboutMe } from '../../../about-me/about-me';
import { Technologies } from '../../../technologies/technologies';
import { Projects } from '../../../projects/projects';
import { ProjectsDialog } from '../projects-dialog/projects-dialog';
import { CommonModule } from '@angular/common';
import { CommentArea } from '../../../comment-area/comment-area';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-mainbody',
  imports: [Hero, AboutMe, Technologies, Projects, ProjectsDialog, CommonModule, CommentArea, Contact],
  templateUrl: './mainbody.html',
  styleUrl: './mainbody.scss',
})
export class Mainbody {
  data!: Project;
  num!: number;
  showDialog: boolean = false;

  openDialog( input: {project: Project , num: number}){
    this.data = input.project;
    this.num = input.num + 1;
    this.showDialog = true;
    document.body.style.overflow = 'hidden';
  }

  closeDialog(){
    this.showDialog = false;
    document.body.style.overflow = '';
  }
}
