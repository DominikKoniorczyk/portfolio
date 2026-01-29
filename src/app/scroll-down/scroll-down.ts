import { Component } from '@angular/core';

@Component({
  selector: 'app-scroll-down',
  imports: [],
  templateUrl: './scroll-down.html',
  styleUrl: './scroll-down.scss',
})
export class ScrollDown {
  openLink(id: string){
    if(id == 'git') window.open('https://github.com/DominikKoniorczyk');
    else if(id == 'linkedIn') window.open('https://www.linkedin.com/in/dominik-koniorczyk-a4056b3a7/');
  }
}
