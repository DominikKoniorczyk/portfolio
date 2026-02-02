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
  constructor(private scrollService: ScrollService) { }

  /**
   * Scrolls the page to the element with the specified ID using the scroll service.
   *
   * @param {string} id - The ID of the target element to scroll to.
   * @returns {void}
   */
  scrollToElement(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
