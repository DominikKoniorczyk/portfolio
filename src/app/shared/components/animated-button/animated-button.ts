import { Component, Input, HostBinding, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-button',
  imports: [],
  templateUrl: './animated-button.html',
  styleUrl: './animated-button.scss',
})
export class AnimatedButton {
  @Input() width: string = "172px";
  @Input() heigth: string = "48px";
  @Input() buttonText: string = "";
  @Input() additionalClass: string = "";

  @ViewChild('text', { static: true }) text!: ElementRef<HTMLElement>;

  private scrollAnimation?: Animation;

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Adds an additional CSS class to the text element if `additionalClass` is defined.
   *
   * @returns {void}
   */
  ngAfterViewInit() {
    if (this.additionalClass) this.text.nativeElement.classList.add(this.additionalClass);
  }

  /**
   * Returns the button width for CSS variable binding.
   *
   * @returns {string | number} The width of the button.
   */
  @HostBinding('style.--width')
  get buttonWidth() {
    return this.width;
  }

  /**
   * Returns the button height for CSS variable binding.
   *
   * @returns {string | number} The height of the button.
   */
  @HostBinding('style.--height')
  get buttonHeight() {
    return this.heigth;
  }

  /**
  * Starts a horizontal scroll animation of the text element from 0 to -100% of its width.
  * If the screen width is below 760px or the text element is not defined, no animation occurs.
  * Awaits the completion of the first scroll and then calls `onFirstEnd`.
  *
  * @async
  * @returns {Promise<void>}
  */
  async startScroll() {
    if (!this.text || window.innerWidth < 760) return;
    this.scrollAnimation?.cancel();
    this.scrollAnimation = this.text.nativeElement.animate(
      [{ transform: 'translateX(0)' },
      { transform: 'translateX(-100%)' }
      ],
      { duration: 1000, easing: 'linear', fill: 'forwards' });
    try {
      await this.scrollAnimation.finished;
      this.onFirstEnd();
    } catch { };
  }

  /**
   * Starts an infinite horizontal scroll animation cycling the text element from 100% to -100%.
   * This is triggered after the initial scroll completes.
   *
   * @returns {void}
   */
  onFirstEnd() {
    if (!this.scrollAnimation) return;
    this.scrollAnimation = this.text.nativeElement.animate(
      [{ transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' }
      ],
      { duration: 2000, easing: 'linear', iterations: Infinity });
  }

  /**
   * Returns the text element to the centered position smoothly.
   * Cancels the current scroll animation and animates from the current transform to 0.
   *
   * @returns {void}
   */
  returnToCenter() {
    if (!this.scrollAnimation) return;
    const currentTransform = getComputedStyle(this.text.nativeElement).transform;
    this.scrollAnimation.cancel();
    this.text.nativeElement.animate(
      [{ transform: currentTransform },
      { transform: 'translateX(0)' }
      ],
      { duration: 300, easing: 'ease-out', fill: 'forwards' });
  }
}
