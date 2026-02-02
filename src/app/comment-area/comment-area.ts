import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { timeout } from 'rxjs';

interface Comment {
  text: string;
  author: string;
}

@Component({
  selector: 'app-comment-area',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './comment-area.html',
  styleUrl: './comment-area.scss',
})
export class CommentArea {
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;
  @ViewChild('viewport', { static: true }) viewport!: ElementRef<HTMLDivElement>;
  @ViewChildren('slideRef') slideEls!: QueryList<ElementRef>;

  items: Comment[] = [
    { text: 'commentArea.commentOne', author: 'Autor 1' },
    { text: 'commentArea.commentTwo', author: 'Autor 2' },
    { text: 'commentArea.commentThree', author: 'Autor 3' },
    { text: 'commentArea.commentFour', author: 'Autor 4' },
  ];

  slides: Comment[] = [];
  activeIndex = 0;
  transform = 'translateX(-280px)';
  transition = 'transform 0.5s ease-in-out';
  isAnimating: boolean = false;

  constructor() {
    this.slides = [
      this.items[this.items.length - 1],
      ...this.items,
      this.items[0]
    ];
    this.activeIndex = 1;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.centerActiveSlide(false);
    });
  }

  private centerActiveSlide(animated = true) {
    const viewportEl = this.viewport.nativeElement;
    const trackEl = this.track.nativeElement;
    const slides = Array.from(trackEl.children) as HTMLElement[];
    if (!slides.length) return;
    const viewportWidth = viewportEl.clientWidth;
    const activeSlide = slides[this.activeIndex];
    if (!activeSlide) return;
    const offset = this.calculateOffset(activeSlide, viewportWidth, trackEl);
    this.transition = animated ? 'transform 0.5s ease-in-out' : 'none';
    this.transform = `translateX(-${offset}px)`;
  }

  private calculateOffset(activeSlide: HTMLElement, viewportWidth: number, trackEl: HTMLElement): number {
    const trackWidth = trackEl.scrollWidth;
    const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
    let offset = slideCenter - viewportWidth / 2;
    offset = Math.max(0, Math.min(offset, trackWidth - viewportWidth));
    return offset;
  }

  cycleComment(next: boolean) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const itemsLength = this.items.length;
    this.activeIndex += next ? 1 : -1;
    if (this.activeIndex === 0) this.activeIndex = itemsLength;
    if (this.activeIndex === itemsLength + 1) this.activeIndex = 1;
    this.centerActiveSlide(true);
    this.resetActiveSlide();
  }

  private resetActiveSlide() {
    setTimeout(() => {
      this.centerActiveSlide(false);
      this.isAnimating = false;
    }, 500);
  }

  getRealIndex(): number {
    const itemsLength = this.items.length;
    let realIndex = this.activeIndex - 1;
    if (realIndex < 0) realIndex = itemsLength - 1;
    if (realIndex >= itemsLength) realIndex = 0;
    return realIndex;
  }

  @HostListener('window:resize')
  onResize() {
    this.centerActiveSlide(false);
  }
}
