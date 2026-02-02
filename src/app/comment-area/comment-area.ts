import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

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

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Centers the currently active slide after a short delay to ensure DOM measurements are available.
   *
   * @returns {void}
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.centerActiveSlide(false);
    });
  }


  /**
   * Centers the currently active slide inside the viewport by calculating and applying a horizontal transform.
   *
   * @param {boolean} [animated=true] - Whether the centering transition should be animated.
   * @returns {void}
   */
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

  /**
   * Calculates the horizontal offset required to center a given slide within the viewport.
   * The returned offset is clamped so the track never scrolls beyond its bounds.
   *
   * @param {HTMLElement} activeSlide - The slide element that should be centered.
   * @param {number} viewportWidth - The width of the viewport in pixels.
   * @param {HTMLElement} trackEl - The track element containing all slides.
   * @returns {number} The clamped horizontal offset in pixels.
   */
  private calculateOffset(activeSlide: HTMLElement, viewportWidth: number, trackEl: HTMLElement): number {
    const trackWidth = trackEl.scrollWidth;
    const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
    let offset = slideCenter - viewportWidth / 2;
    offset = Math.max(0, Math.min(offset, trackWidth - viewportWidth));
    return offset;
  }

  /**
   * Cycles to the next or previous comment/slide and triggers a centering animation.
   * Uses a guard flag to prevent overlapping animations.
   *
   * @param {boolean} next - If `true`, moves forward to the next item; otherwise moves backward.
   * @returns {void}
   */
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

  /**
  * Resets the slide position after the animation has completed and re-enables interactions.
  *
  * @returns {void}
  */
  private resetActiveSlide() {
    setTimeout(() => {
      this.centerActiveSlide(false);
      this.isAnimating = false;
    }, 500);
  }

  /**
   * Converts the internal active index (including cloned boundary slides) into the real index
   * of the items array.
   *
   * @returns {number} The real item index within the `items` array.
   */
  getRealIndex(): number {
    const itemsLength = this.items.length;
    let realIndex = this.activeIndex - 1;
    if (realIndex < 0) realIndex = itemsLength - 1;
    if (realIndex >= itemsLength) realIndex = 0;
    return realIndex;
  }

  /**
   * Handles window resize events and re-centers the currently active slide without animation.
   *
   * @returns {void}
   */
  @HostListener('window:resize')
  onResize() {
    this.centerActiveSlide(false);
  }
}
