import { ScrollService } from '../shared/services/scroll.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header-comp',
  imports: [],
  templateUrl: './header-comp.html',
  styleUrl: './header-comp.scss',
})
export class HeaderComp {

  constructor(private scrollService: ScrollService){}

  scrollToElement(id: string){
    this.scrollService.scrollToElementById(id);
  }
}
