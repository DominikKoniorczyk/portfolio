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
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-mainbody',
  imports: [Hero, AboutMe, Technologies, Projects, ProjectsDialog, CommonModule, CommentArea, Contact, Footer],
  templateUrl: './mainbody.html',
  styleUrl: './mainbody.scss',
})
export class Mainbody {
  data!: Project;
  num!: number;
  showDialog: boolean = false;

  /**
   * Opens a dialog and sets the provided project data and number.
   * Also disables page scrolling while the dialog is open.
   *
   * @param {{ project: Project, num: number }} input - An object containing the project to display and its number.
   * @param {Project} input.project - The project data to be shown in the dialog.
   * @param {number} input.num - The index number of the project, zero-based.
   * @returns {void}
   */
  openDialog(input: { project: Project, num: number }) {
    this.data = input.project;
    this.num = input.num + 1;
    this.showDialog = true;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the dialog and re-enables page scrolling.
   *
   * @returns {void}
   */
  closeDialog() {
    this.showDialog = false;
    document.body.style.overflow = '';
  }
}
