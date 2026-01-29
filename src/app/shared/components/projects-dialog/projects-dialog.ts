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
  projects!: Project[];

  constructor(projectService: ProjectsService){
    this.projects = projectService.projects;
  }

  @Output() close = new EventEmitter<void>();

  openLink(id: number){
    if(id == 0) window.open(this.project.gitHub);
    else window.open(this.project.link);
  }

  closeDialog(){
    this.close.emit();
  }

  nextProject(){
    if(this.num! < this.projects.length){
      this.project = this.projects[this.num!];
      this.num! += 1;
    }
    else {
      this.project = this.projects[0];
      this.num! = 1;
    }
  }
}
