import { Component, ElementRef, HostBinding, Input, TemplateRef, ViewChild } from '@angular/core';
import { TechnologiesSvg } from '../../services/technologies-svg';
import { TranslatePipe } from '@ngx-translate/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-skill-button',
  imports: [TranslatePipe],
  templateUrl: './skill-button.html',
  styleUrl: './skill-button.scss',
})
export class SkillButton {
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() svgType: string = "";
  @Input() svgWidth: string = "48px";
  @Input() svgHeight: string = "48px";
  @Input() text: string = "HTML";
  svgPath: string = "";
  view: { x: number, y: number, w: number, h: number } = { x: 0, y: 0, w: 100, h: 100 };
  svgSource: string = "http://www.w3.org/2000/svg";
  iconColor?: string;

  private destroy$ = new Subject<void>();

  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('icon', { static: true }) icon!: ElementRef<HTMLDivElement>;
  @ViewChild('wrapper', { static: true }) textField!: ElementRef<HTMLDivElement>;
  @ViewChild('tooltip', { static: true }) tooltip!: ElementRef<HTMLDivElement>;

  constructor(private svgPaths: TechnologiesSvg) { }

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Initializes the SVG by setting the path, viewBox, and icon color, then appends it to the container.
   * Also applies a special CSS class if the SVG type requires it.
   *
   * @returns {void}
   */
  ngAfterViewInit() {
    this.svgPath = this.svgPaths.returnPath(this.svgType);
    this.view = this.svgPaths.returnViewBox(this.svgType);
    this.iconColor = this.svgType == 'Mindset' ? '#3DCFB6' : '#FFFFFF';
    this.addSvg();
    this.addHoverTextClass();
  }

  /**
   * Angular lifecycle hook that is called after the component has been initialized.
   * Registers a debounced window resize listener and updates the auto-scroll CSS class accordingly.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.addAutoAnimClass();
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.addAutoAnimClass();
      });
  }

  /**
  * Adds or removes the 'icon_animated' CSS class depending on the current viewport width.
  * The animation is enabled for small screens (<= 760px) and disabled for larger screens.
  *
  * @returns {void}
  */
  addAutoAnimClass() {
    if (window.innerWidth <= 760) this.icon.nativeElement.classList.add('icon_animated');
    else this.icon.nativeElement.classList.remove('icon_animated');
  }

  /**
   * Angular lifecycle hook that is called when the component is destroyed.
   * Emits and completes the destroy subject to unsubscribe from active observables.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Creates an SVG element with the configured width, height, and viewBox,
   * then generates its path and appends it to the container.
   *
   * @returns {void}
   */
  private addSvg() {
    const svg = document.createElementNS(this.svgSource, 'svg');
    svg.setAttribute('width', this.svgWidth);
    svg.setAttribute('height', this.svgHeight);
    svg.setAttribute('viewBox', this.viewBox);
    this.generatePath(svg);
  }

  /**
   * Generates a <path> element inside the given SVG element with the configured path data and color.
   * Appends the path to the SVG and the SVG to the container if available.
   *
   * @param {Element} svg - The SVG element where the path should be added.
   * @returns {void}
   */
  private generatePath(svg: Element) {
    const path = document.createElementNS(this.svgSource, 'path')
    path.setAttribute('d', this.svgPath);
    path.setAttribute('stroke', (this.iconColor!));
    path.setAttribute('stroke-width', '1');
    path.setAttribute('fill', (this.iconColor!));
    svg.appendChild(path);
    if (this.svgContainer) this.svgContainer.nativeElement.appendChild(svg);
  }

  /**
   * Adds a specific CSS class to the text field element if the SVG type is 'Mindset'.
   *
   * @returns {void}
   */
  private addHoverTextClass() {
    if (this.svgType == 'Mindset') {
      this.textField.nativeElement.classList.add('mind_set');
    }
  }

  /**
   * Returns the SVG width for CSS variable binding.
   *
   * @returns {string} The SVG width as a string, for CSS use.
   */
  @HostBinding('style.--svg_width')
  get buttonWidth() {
    return this.svgWidth;
  }

  /**
   * Returns the SVG height for CSS variable binding.
   *
   * @returns {string} The SVG height as a string, for CSS use.
   */
  @HostBinding('style.--svg_height')
  get buttonHeight() {
    return this.svgHeight;
  }

  /**
   * Constructs the SVG viewBox attribute string from the view object.
   *
   * @returns {string} The formatted viewBox string in the format "x y width height".
   */
  get viewBox(): string {
    return `${this.view.x} ${this.view.y} ${this.view.w} ${this.view.h}`
  }

  /**
   * Opens the tooltip on click, used for mobile to display the mindset overlay.
   *
   * @returns {void}
   */
  clickOnMindset() {
    if (this.svgType == 'Mindset') {
      this.tooltip.nativeElement.classList.toggle('tooltip_visibel');
    }
  }
}
