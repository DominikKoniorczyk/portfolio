import { AfterViewInit, Component, ElementRef, Input, ViewChild, Renderer2, OnDestroy, TemplateRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-hero-banner',
  imports: [],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.scss',
})
export class HeroBannerComponent implements AfterViewInit, OnDestroy {
  @Input() contentTemplate!: TemplateRef<any>;
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

  private resizeSubscripe!: Subscription;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.initAnimation();
    this.resizeSubscripe = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => this.initAnimation());
  }

  private initAnimation() {
    if (!this.track) return;
    const parent = this.track.nativeElement;
    while (parent.firstChild) parent.removeChild(parent.firstChild);
    const numCopies = 3;
    for (let i = 0; i < numCopies; i++) {
      const div = this.renderer.createElement('div');
      this.renderer.addClass(div, 'banner-item');
      const view = this.contentTemplate.createEmbeddedView(null);
      view.rootNodes.forEach(node => this.renderer.appendChild(div, node));
      this.renderer.appendChild(parent, div);
    }
    const firstChild = parent.firstChild;
    if (firstChild) {
      const firstItem = parent.firstChild as HTMLElement;
      const textWidth = firstItem.offsetWidth + parseInt(getComputedStyle(firstItem).marginRight);
      const duration = 5;//Math.max(10, textWidth * 0.05);
      const styleId = 'dynamic-marquee-style';
      let styleEl = document.getElementById(styleId);
      if (!styleEl) {
        styleEl = this.renderer.createElement('style');
        this.renderer.setAttribute(styleEl, 'id', styleId);
        this.renderer.appendChild(document.head, styleEl);
      }

      (styleEl!).textContent = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${textWidth}px); }
      }
    `;

      this.renderer.setStyle(parent, 'animation', `marquee ${duration}s linear infinite`);
    }
  }

  ngOnDestroy() {
    if (this.resizeSubscripe) this.resizeSubscripe.unsubscribe();
  }
}

