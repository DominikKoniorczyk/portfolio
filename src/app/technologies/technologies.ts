import { Component } from '@angular/core';
import { AnimatedButton } from '../shared/components/animated-button/animated-button';
import { ScrollService } from '../shared/services/scroll.service';
import { SkillButton } from '../shared/components/skill-button/skill-button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-technologies',
  imports: [AnimatedButton, SkillButton, TranslatePipe],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies {

  constructor(private scrollService: ScrollService){}

  scrollToElement(id: string){
    this.scrollService.scrollToElementById(id);
  }
}
