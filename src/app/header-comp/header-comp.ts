import { Router } from '@angular/router';
import { ScrollService } from '../shared/services/scroll.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-comp',
  imports: [TranslatePipe],
  templateUrl: './header-comp.html',
  styleUrl: './header-comp.scss',
})
export class HeaderComp {
  router = inject(Router);
  private translate = inject(TranslateService);

  @ViewChild('buttonEn', { static: true }) englishButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('buttonDe', { static: true }) germanButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('buttonEnBurger', { static: true }) englishBurgerButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('buttonDeBurger', { static: true }) germanBurgerButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('burgerMenu', { static: true }) burgerMenu!: ElementRef<HTMLDivElement>;

  constructor(private scrollService: ScrollService) { }

  /**
   * Angular lifecycle hook that is called once after the component has been initialized.
   * Loads the previously selected language from localStorage (if available) and applies it.
   *
   * @returns {void}
   */
  ngOnInit() {
    const localStorageItem = localStorage.getItem('lang');
    if (localStorageItem !== null) {
      const loadLang = JSON.parse(localStorageItem)
      this.changeLang(loadLang);
    }
  }

  /**
   * Scrolls to the element with the given id.
   * If the user is not currently on the home route, it navigates to home first and then scrolls.
   *
   * @param {string} id - The id of the target element to scroll to.
   * @returns {void}
   */
  scrollToElement(id: string) {
    if (this.router.url != '/' && this.router.url != 'home') {
      this.router.navigate(['/']).then(success => {
        if (success) {
          setTimeout(() => this.finalScroll(id), 100);
        }
      });
    } else this.finalScroll(id);
  }

  /**
   * Performs the final scroll action to the element with the given id.
   *
   * @param {string} id - The id of the target element to scroll to.
   * @returns {void}
   */
  finalScroll(id: string) {
    this.scrollService.scrollToElementById(id);
  }

  /**
   * Changes the active language in the translation service and updates UI + storage.
   *
   * @param {string} lang - The language key to activate (e.g. "en", "de").
   * @returns {void}
   */
  changeLang(lang: string) {
    this.translate.use(lang);
    this.setLanguageButtonActive(lang);
    this.saveLanguageToStorage(lang);
  }

  /**
   * Updates the language button states to reflect the currently active language.
   *
   * @param {string} lang - The active language key (e.g. "en", "de").
   * @returns {void}
   */
  setLanguageButtonActive(lang: string) {
    if (lang == "en") {
      this.englishButton.nativeElement.classList.add('active');
      this.germanButton.nativeElement.classList.remove('active');
      this.englishBurgerButton.nativeElement.classList.add('active');
      this.germanBurgerButton.nativeElement.classList.remove('active');
    } else {
      this.englishButton.nativeElement.classList.remove('active');
      this.germanButton.nativeElement.classList.add('active');
      this.englishBurgerButton.nativeElement.classList.remove('active');
      this.germanBurgerButton.nativeElement.classList.add('active');
    }
  }

  /**
   * Persists the selected language in localStorage.
   *
   * @param {string} lang - The language key to store (e.g. "en", "de").
   * @returns {void}
   */
  saveLanguageToStorage(lang: string) {
    localStorage.setItem('lang', JSON.stringify(lang));
  }

  /**
   * Handles clicks on navigation links inside the burger menu.
   * Closes the burger menu and scrolls to the requested element.
   *
   * @param {string} id - The id of the target element to scroll to.
   * @returns {void}
   */
  clickOnLinkInBurgerMenu(id: string) {
    this.openCloseBurgerMenu(false);
    this.scrollToElement(id);
  }

  /**
   * Opens or closes the burger menu by toggling its visibility class.
   *
   * @param {boolean} open - Whether the burger menu should be opened (`true`) or closed (`false`).
   * @returns {void}
   */
  openCloseBurgerMenu(open: boolean) {
    if (open) {
      this.burgerMenu.nativeElement.classList.remove('d_none');
    } else {
      this.burgerMenu.nativeElement.classList.add('d_none');
    }
  }
}
