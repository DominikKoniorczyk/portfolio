import { Router } from '@angular/router';
import { ScrollService } from '../shared/services/scroll.service';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header-comp',
  imports: [TranslatePipe],
  templateUrl: './header-comp.html',
  styleUrl: './header-comp.scss',
})
export class HeaderComp {
  router = inject(Router);

  constructor(private scrollService: ScrollService) { }

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
}
