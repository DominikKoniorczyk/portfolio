import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../services/projects.service';

export interface technology {
  img: string;
  name: string;
}

@Component({
  selector: 'app-projects-dialog',
  imports: [],
  templateUrl: './projects-dialog.html',
  styleUrl: './projects-dialog.scss',
})
export class ProjectsDialog {
  @Input() project!: Project;
  @Input() num?: number;
  projectNumber: string = "01";
  projectName: string = "El Pollo Loco";
  projectDesc: string = "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen."
  projectTech?: technology[];
  projectTechString?: string[];
  projectImage?: string = "./assets/img/el_pollo_loco_ingame.png";
  projectImageAltText?: string;

  @Output() close = new EventEmitter<void>();

  openPage(data: Project, id: number){
    this.projectNumber = "0" + (id+1);
    this.projectName = data.name;
    this.projectDesc = data.description;
    this.projectImage = data.bigImgSrc;
    this.projectImageAltText = data.altTag;
    this.projectTechString = data.technology;
  }

  closeDialog(){
    this.close.emit();
  }
}
