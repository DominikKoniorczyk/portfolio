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
  view : {x: number, y: number, w: number, h: number} = { x: 0, y: 0, w: 100, h: 100};
  svgSource: string = "http://www.w3.org/2000/svg";
  iconColor?: string;

  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('wrapper', { static: true }) textField!: ElementRef<HTMLDivElement>;

  constructor(private svgPaths: TechnologiesSvg){ }

  ngAfterViewInit(){
    this.svgPath = this.svgPaths.returnPath(this.svgType);
    this.view = this.svgPaths.returnViewBox(this.svgType);
    this.iconColor = '#3DCFB6';
    this.addSvg();
    this.addHoverTextClass();
  }

  private addSvg(){
    const svg = document.createElementNS(this.svgSource, 'svg');
    svg.setAttribute('width', this.svgWidth);
    svg.setAttribute('height', this.svgHeight);
    svg.setAttribute('viewBox', this.viewBox);
    this.generatePath(svg);
  }

  private generatePath(svg: Element){
    const path = document.createElementNS(this.svgSource, 'path')
    path.setAttribute('d', this.svgPath);
    path.setAttribute('stroke', (this.iconColor!));
    path.setAttribute('stroke-width', '1');
    path.setAttribute('fill', (this.iconColor!));
    svg.appendChild(path);
    if(this.svgContainer) this.svgContainer.nativeElement.appendChild(svg);
  }

  private addHoverTextClass(){
    if(this.svgType == 'Mindset') {
      this.textField.nativeElement.classList.add('mind_set');
    }
  }

  @HostBinding('style.--svg_width')
  get buttonWidth(){
    return this.svgWidth;
  }

  @HostBinding('style.--svg_height')
  get buttonHeight(){
    return this.svgHeight;
  }

  get viewBox():string {
    return `${this.view.x} ${this.view.y} ${this.view.w} ${this.view.h}`
  }
}
