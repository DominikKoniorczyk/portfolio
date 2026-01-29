import { Component, Input, TemplateRef } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-banner',
  imports: [TranslatePipe],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.scss',
})
export class HeroBanner {
  @Input() contentTemplate!: TemplateRef<any>;
}
