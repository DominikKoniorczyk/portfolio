import { Component, Input } from '@angular/core';

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
  projectNumber: string = "01";
  projectName: string = "El Pollo Loco";
  projectDesc: string = "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen."
  projectTech?: technology[];
  projectImage?: string;

  openPage(pageToOpen: string){
    switch (pageToOpen){
      case ("El Pollo Loco"):
      case ("Pokedex"):
      case ("Join"):
      default: return;
    }
  }
}
