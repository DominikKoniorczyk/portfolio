import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project, ProjectsService } from '../../services/projects.service';
import { ProjectsDialogTechnologie } from '../projects-dialog-technologie/projects-dialog-technologie';
import { TranslatePipe } from '@ngx-translate/core';

export interface technology {
  img: string;
  name: string;
}

@Component({
  selector: 'app-projects-dialog',
  imports: [ProjectsDialogTechnologie, TranslatePipe],
  templateUrl: './projects-dialog.html',
  styleUrl: './projects-dialog.scss',
})
export class ProjectsDialog {
  @Input() project!: Project;
  @Input() num?: number;
  @Output() close = new EventEmitter<void>();
  projects!: Project[];

  constructor(projectService: ProjectsService) {
    this.projects = projectService.projects;
  }

  /**
   * Opens a link in a new browser tab.
   * Opens the GitHub link if `id` is 0, otherwise opens the project link.
   *
   * @param {number} id - Identifier to determine which link to open (0 for GitHub, else project link).
   * @returns {void}
   */
  openLink(id: number) {
    if (id == 0) window.open(this.project.gitHub);
    else window.open(this.project.link);
  }

  /**
   * Emits the close event to notify parent components to close this dialog.
   *
   * @returns {void}
   */
  closeDialog() {
    this.close.emit();
  }

  /**
   * Moves to the next project in the projects array.
   * Loops back to the first project when the end of the array is reached.
   *
   * @returns {void}
   */
  nextProject() {
    if (this.num! < this.projects.length) {
      this.project = this.projects[this.num!];
      this.num! += 1;
    }
    else {
      this.project = this.projects[0];
      this.num! = 1;
    }
  }
}
