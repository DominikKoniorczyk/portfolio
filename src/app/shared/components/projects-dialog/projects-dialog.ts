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

  @Output() close = new EventEmitter<void>();


  projectNumber: string = "01";
  projectName: string = "El Pollo Loco";
  projectDesc: string = "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen."
  projectTech?: technology[];
  projectTechString?: string[];
  projectImage?: string = "./assets/img/el_pollo_loco_ingame.png";
  projectImageAltText?: string;

  openLink(id: number){
    if(id == 1){}
    else{}
  }

  closeDialog(){
    this.close.emit();
  }
}
