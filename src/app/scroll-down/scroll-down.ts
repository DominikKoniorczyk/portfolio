import { Component } from '@angular/core';

@Component({
  selector: 'app-scroll-down',
  imports: [],
  templateUrl: './scroll-down.html',
  styleUrl: './scroll-down.scss',
})
export class ScrollDown {

  /**
  * Opens a link or email client based on the provided identifier.
  *
  * @param {string} id - The identifier of the link to open. Supported values:
  *   - `'git'` opens the GitHub profile.
  *   - `'linkedIn'` opens the LinkedIn profile.
  *   - `'mail'` opens the default mail client with the specified email.
  * @returns {void}
  */
  openLink(id: string) {
    if (id == 'git') window.open('https://github.com/DominikKoniorczyk');
    else if (id == 'linkedIn') window.open('https://www.linkedin.com/in/dominik-koniorczyk-a4056b3a7/');
    else if (id == 'mail') window.open('mailto:contact@dominik-koniorczyk.de');
  }
}
