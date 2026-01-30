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

   ngOnInit(){
    const localStorageItem = localStorage.getItem('lang');
    if(localStorageItem !== null){
      const loadLang = JSON.parse(localStorageItem)
      this.changeLang(loadLang);
    }
  }

  scrollToElement(id: string) {
    if (this.router.url != '/' && this.router.url != 'home') {
      this.router.navigate(['/']).then(success => {
        if (success) {
          this.finalScroll(id);
        }
      });
    } else this.finalScroll(id);
  }

  finalScroll(id: string) {
    this.scrollService.scrollToElementById(id);
  }

  changeLang(lang: string){
    this.translate.use(lang);
    this.setLanguageButtonActive(lang);
    this.saveLanguageToStorage(lang);
  }

  setLanguageButtonActive(lang: string){
    if(lang == "en"){
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

  saveLanguageToStorage(lang: string){
    localStorage.setItem('lang', JSON.stringify(lang));
  }

  clickOnLinkInBurgerMenu(id: string){
    this.openCloseBurgerMenu(false);
    this.scrollToElement(id);
  }

  openCloseBurgerMenu(open: boolean){
    if(open){
      this.burgerMenu.nativeElement.classList.remove('d_none');
    } else{
      this.burgerMenu.nativeElement.classList.add('d_none');
    }
  }
}
