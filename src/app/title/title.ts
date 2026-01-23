import { Component } from '@angular/core';
import { AnimatedButton } from '../shared/components/animated-button/animated-button';
import { ScrollService } from '../shared/services/scroll.service';

@Component({
  selector: 'app-title',
  imports: [AnimatedButton],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title {
    constructor(private scrollService: ScrollService){}

    scrollToElement(id: string){
      this.scrollService.scrollToElementById(id);
    }
}
