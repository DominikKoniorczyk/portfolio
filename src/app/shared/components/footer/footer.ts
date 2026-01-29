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
  constructor(private scrollService: ScrollService){}

  scrollToElement(id: string){
    this.scrollService.scrollToElementById(id);
  }

  openLink(id: string){
    if(id == 'git') window.open('https://github.com/DominikKoniorczyk');
    else if(id == 'linkedIn') window.open('https://www.linkedin.com/in/dominik-koniorczyk-a4056b3a7/');
    else if(id == 'mail') window.location.href = "mailto:contact@dominik-koniorczyk.de";
    else if(id == 'legal') this.router.navigate(['imprint']);
  }
}
