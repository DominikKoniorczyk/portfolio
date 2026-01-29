import { Injectable } from '@angular/core';

export interface Project{
  name: string;
  description: string;
  imgSrc: string;
  bigImgSrc: string;
  altTag: string;
  technology: string[];
  tech: string[];
  gitHub: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Project[] = [
    {
      name: "El Pollo Loco",
      description: 'projectsDialog.polloDesc',
      imgSrc: "./assets/img/el_pollo_loco.png",
      bigImgSrc: "./assets/img/el_pollo_loco_ingame.png",
      altTag: "El Pollo Loco imgage",
      technology: ["JavaScript", "HTML", "CSS"],
      tech: ["JS", "HTML", "CSS"],
      gitHub: "https://github.com/DominikKoniorczyk/el-pollo-loco",
      link: ""
    },
    {
      name: "Pokedex",
      description: 'projectsDialog.pokeDesc',
      imgSrc: "./assets/img/pokemon_small.png",
      bigImgSrc: "./assets/img/pokemon_big.png",
      altTag: "El Pollo Loco imgage",
      technology: ["JavaScript", "HTML", "CSS", "REST-API"],
      tech: ["JS", "HTML", "CSS", "REST-API"],
      gitHub: "https://github.com/DominikKoniorczyk/Pokedex",
      link: ""
    },
    {
      name: "Join",
      description: 'projectsDialog.joinDesc',
      imgSrc: "./assets/img/el_pollo_loco.png",
      bigImgSrc: "./assets/img/el_pollo_loco_ingame.png",
      altTag: "El Pollo Loco imgage",
      technology: ["Angular", "TypeScript", "HTML", "SCSS", "Supabase"],
      tech: ["Angular", "TS", "HTML", "SCSS", "Supabase"],
      gitHub: "",
      link: ""
    },
  ]
}
