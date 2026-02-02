import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(private router: Router) { }

  /**
   * Scrolls smoothly to an HTML element identified by its ID.
   *
   * @param {string} id - The ID of the element to scroll to.
   * @returns {void}
   */
  scrollToElementById(id: string) {
    const element = this.getElementById(id);
    this.scrollToElement(element);
  }

  /**
   * Retrieves an HTML element by its ID.
   *
   * @param {string} id - The ID of the element to retrieve.
   * @returns {HTMLElement} The HTML element with the specified ID.
   * @throws {Error} Throws an error if the element does not exist.
   */
  private getElementById(id: string): HTMLElement {
    const element = document.getElementById(id);
    if(!element) throw new Error('Element with ID "${id}" not found.');
    return (element!);
  }

  /**
   * Scrolls smoothly to the specified HTML element.
   *
   * @param {HTMLElement} element - The element to scroll into view.
   * @returns {void}
   */
  scrollToElement(element: HTMLElement) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
