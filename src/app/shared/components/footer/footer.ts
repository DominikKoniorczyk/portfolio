import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  router = inject(Router);
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

  /**
   * Opens an external link or navigates within the app based on the provided identifier.
   *
   * - 'git' opens the GitHub profile in a new tab.
   * - 'linkedIn' opens the LinkedIn profile in a new tab.
   * - 'mail' opens the default mail client with a predefined email address.
   * - 'legal' navigates to the 'imprint' route within the app.
   *
   * @param {string} id - The identifier of the link to open.
   * @returns {void}
   */
  openLink(id: string) {
    if (id == 'git') window.open('https://github.com/DominikKoniorczyk');
    else if (id == 'linkedIn') window.open('https://www.linkedin.com/in/dominik-koniorczyk-a4056b3a7/');
    else if (id == 'mail') window.location.href = "mailto:contact@dominik-koniorczyk.de";
    else if (id == 'legal') this.router.navigate(['imprint']);
  }
}
