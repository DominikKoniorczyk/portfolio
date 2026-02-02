import { Component, ElementRef, HostBinding, Input, TemplateRef, ViewChild } from '@angular/core';
import { TechnologiesSvg } from '../../services/technologies-svg';

@Component({
  selector: 'app-projects-dialog-technologie',
  imports: [],
  templateUrl: './projects-dialog-technologie.html',
  styleUrl: './projects-dialog-technologie.scss',
})
export class ProjectsDialogTechnologie {
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() svgType: string = "";
  @Input() svgWidth: string = "48px";
  @Input() svgHeight: string = "48px";
  @Input() text: string = "HTML";
  svgPath: string = "";
  view: { x: number, y: number, w: number, h: number } = { x: 0, y: 0, w: 100, h: 100 };
  svgSource: string = "http://www.w3.org/2000/svg";
  iconColor?: string;

  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('wrapper', { static: true }) textField!: ElementRef<HTMLDivElement>;

  constructor(private svgPaths: TechnologiesSvg) { }

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Initializes the SVG by setting the path, viewBox, color, and appending it to the container.
   *
   * @returns {void}
   */
  ngAfterViewInit() {
    this.svgPath = this.svgPaths.returnPath(this.svgType);
    this.view = this.svgPaths.returnViewBox(this.svgType);
    this.iconColor = '#3DCFB6';
    this.addSvg();
    this.addHoverTextClass();
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
   * Generates a path element inside the given SVG element with the configured path data and color.
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
   * Adds a CSS class to the text field element if the SVG type matches 'Mindset'.
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
   * @returns {string} The SVG width as a string (used for CSS).
   */
  @HostBinding('style.--svg_width')
  get buttonWidth() {
    return this.svgWidth;
  }

  /**
   * Returns the SVG height for CSS variable binding.
   *
   * @returns {string} The SVG height as a string (used for CSS).
   */
  @HostBinding('style.--svg_height')
  get buttonHeight() {
    return this.svgHeight;
  }

  /**
   * Constructs the SVG viewBox attribute string from the view object.
   *
   * @returns {string} The formatted viewBox string in the form "x y width height".
   */
  get viewBox(): string {
    return `${this.view.x} ${this.view.y} ${this.view.w} ${this.view.h}`
  }
}
