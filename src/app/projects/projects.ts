import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { Project, ProjectsService } from '../shared/services/projects.service';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  allProjects!: Project[];
  projectElements!: ElementRef<HTMLDivElement>[];

  @ViewChildren('project') projects!: QueryList<ElementRef<HTMLDivElement>>;

  @Output() openDialog = new EventEmitter<{project: Project, num: number}>();

  constructor(projectService: ProjectsService){
    if(projectService){
      this.allProjects = projectService.projects;
    }
  }

  ngAfterViewInit() {
    this.projectElements = this.projects.toArray();
  }

  onProjectHover(id: number) {
    if (this.projectElements[id]) {
      this.projectElements[id].nativeElement.classList.remove('d_none');
    }
  }

  onProjectUnhover(id: number) {
    if (this.projectElements[id]) {
      this.projectElements[id].nativeElement.classList.add('d_none');
    }
  }

  openDetails(id: number){
    this.openDialog.emit({project: this.allProjects[id], num: id});
  }
}
