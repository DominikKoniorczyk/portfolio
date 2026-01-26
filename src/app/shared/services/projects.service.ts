import { Injectable } from '@angular/core';

export interface Project{
  name: string;
  description: string;
  imgSrc: string;
  bigImgSrc: string;
  altTag: string;
  technology: string[];
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
      description: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
      imgSrc: "./assets/img/el_pollo_loco.png",
      bigImgSrc: "./assets/img/el_pollo_loco_ingame.png",
      altTag: "El Pollo Loco imgage",
      technology: ["JavaScript", "HTML", "CSS"],
      gitHub: "https://github.com/DominikKoniorczyk/el-pollo-loco",
      link: ""
    },
    {
      name: "Pokedex",
      description: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
      imgSrc: "./assets/img/el_pollo_loco.png",
      bigImgSrc: "./assets/img/el_pollo_loco_ingame.png",
      altTag: "El Pollo Loco imgage",
      technology: ["JavaScript", "HTML", "CSS", "REST-API"],
      gitHub: "https://github.com/DominikKoniorczyk/Pokedex",
      link: ""
    },
    {
      name: "Join",
      description: "",
      imgSrc: "./assets/img/el_pollo_loco.png",
      bigImgSrc: "./assets/img/el_pollo_loco_ingame.png",
      altTag: "El Pollo Loco imgage",
      technology: ["Angular", "TypeScript", "HTML", "SCSS", "Supabase"],
      gitHub: "",
      link: ""
    },
  ]
}
