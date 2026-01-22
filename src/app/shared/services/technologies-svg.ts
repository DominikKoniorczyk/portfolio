import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesSvg {

  html: string = "";
  css: string = "";
  js: string = "";
  ts: string = "";
  angular: string = "";
  supabase: string = "";
  git: string = "";
  api: string = "";
  mindset: string ="";

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
}
