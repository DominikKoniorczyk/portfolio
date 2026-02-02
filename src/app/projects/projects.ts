import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { Project, ProjectsService } from '../shared/services/projects.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  allProjects!: Project[];
  projectElements!: ElementRef<HTMLDivElement>[];

  @ViewChildren('project') projects!: QueryList<ElementRef<HTMLDivElement>>;

  @Output() openDialog = new EventEmitter<{ project: Project, num: number }>();

  constructor(projectService: ProjectsService) {
    if (projectService) {
      this.allProjects = projectService.projects;
    }
  }

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Stores references to all project elements in an array for later manipulation.
   *
   * @returns {void}
   */
  ngAfterViewInit() {
    this.projectElements = this.projects.toArray();
  }

  /**
   * Makes the hovered project element visible by removing the 'd_none' CSS class.
   *
   * @param {number} id - The index of the project in the `projectElements` array.
   * @returns {void}
   */
  onProjectHover(id: number) {
    if (this.projectElements[id]) {
      this.projectElements[id].nativeElement.classList.remove('d_none');
    }
  }

  /**
   * Hides the unhovered project element by adding the 'd_none' CSS class.
   *
   * @param {number} id - The index of the project in the `projectElements` array.
   * @returns {void}
   */
  onProjectUnhover(id: number) {
    if (this.projectElements[id]) {
      this.projectElements[id].nativeElement.classList.add('d_none');
    }
  }

  /**
   * Emits an event to open the details dialog for a specific project.
   *
   * @param {number} id - The index of the project in the `allProjects` array.
   * @returns {void}
   */
  openDetails(id: number) {
    this.openDialog.emit({ project: this.allProjects[id], num: id });
  }
}
