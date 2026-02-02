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

  ngAfterViewInit(){
    if(this.additionalClass) this.text.nativeElement.classList.add(this.additionalClass);
  }

  @HostBinding('style.--width')
  get buttonWidth(){
    return this.width;
  }

  @HostBinding('style.--height')
  get buttonHeight(){
    return this.heigth;
  }

  async startScroll(){
    if (!this.text || window.innerWidth < 760) return;
    this.scrollAnimation?.cancel();
    this.scrollAnimation = this.text.nativeElement.animate(
      [ { transform: 'translateX(0)' },
        { transform: 'translateX(-100%)' }
      ],
      { duration: 1000, easing: 'linear', fill: 'forwards'});
      try {
        await this.scrollAnimation.finished;
        this.onFirstEnd();
      } catch{};
  }

  onFirstEnd(){
    if (!this.scrollAnimation) return;
    this.scrollAnimation = this.text.nativeElement.animate(
      [ { transform: 'translateX(100%)' },
        { transform: 'translateX(-100%)' }
      ],
      { duration: 2000, easing: 'linear', iterations: Infinity});
  }

  returnToCenter() {
    if (!this.scrollAnimation) return;
    const currentTransform = getComputedStyle(this.text.nativeElement).transform;
    this.scrollAnimation.cancel();
    this.text.nativeElement.animate(
      [ { transform: currentTransform },
        { transform: 'translateX(0)' }
      ],
      { duration: 300, easing: 'ease-out', fill: 'forwards'});
  }
}
