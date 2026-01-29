import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

  constructor(private scrollService: ScrollService){}

  scrollToElement(id: string){
    this.scrollService.scrollToElementById(id);
  }
}
