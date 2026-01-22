import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesSvg {

  html: string = "M25.2 45.2984L38.136 41.7816L39.8804 22.8032H16.8728L16.3016 16.492H40.4544L41.09 10.3012H9.31L11.0908 28.9996H32.9868L32.256 37.0244L25.2 38.892L18.144 37.0244L17.7016 31.8612H11.3456L12.2668 41.7844L25.2 45.2984ZM0 0H50.4L45.8556 50.4L25.2 56L4.5444 50.4L0 0Z";
  css: string = "";
  js: string = "";
  ts: string = "";
  angular: string = "";
  supabase: string = "";
  git: string = "";
  api: string = "";
  mindset: string ="";

  htmlSize: {x: number, y: number, w: number, h: number} = {x: 0, y: 0, w: 51, h: 56};
  cssSize: {x: number, y: number, w: number, h: number} = {x: 0, y: 0, w: 51, h: 56};

  returnPath(input: string = "HTML"){
    switch(input){
      case "HTML": return this.html;
      case "CSS": return this.css;
      case "JS": return this.js;
      case "ts": return this.ts;
      case "Angular": return this.angular;
      case "Supabase": return this.supabase;
      case "Git": return this.git;
      case "API": return this.api;
      case "Mindset": return this.mindset;
      default: return this.html;
    }
  }

  returnViewBox(input: string = "HTML"){
    switch(input){
      default: return this.htmlSize;
    }
  }
}
