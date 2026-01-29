import { Component } from '@angular/core';
import { AnimatedButton } from '../shared/components/animated-button/animated-button';
import { ScrollService } from '../shared/services/scroll.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-title',
  imports: [AnimatedButton, TranslatePipe],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title {
    constructor(private scrollService: ScrollService){}

    scrollToElement(id: string){
      this.scrollService.scrollToElementById(id);
    }
}
