import { Component, ElementRef, HostBinding, Input, TemplateRef, ViewChild } from '@angular/core';
import { TechnologiesSvg } from '../../services/technologies-svg';

@Component({
  selector: 'app-skill-button',
  imports: [],
  templateUrl: './skill-button.html',
  styleUrl: './skill-button.scss',
})
export class SkillButton {
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() svgType: string = "";
  @Input() svgWidth: string = "48px";
  @Input() svgHeight: string = "48px";
  svgPath: string = "";
  view : {x: number, y: number, w: number, h: number} = { x: 0, y: 0, w: 100, h: 100};
  text: string = "HTML";
  svgSource: string = "http://www.w3.org/2000/svg";

  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef<HTMLDivElement>;

  constructor(private svgPaths: TechnologiesSvg){ }

  ngAfterViewInit(){
    this.svgPath = this.svgPaths.returnPath(this.svgType);
    this.view = this.svgPaths.returnViewBox(this.svgType);
    this.addSvg();
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
    path.setAttribute('stroke', '#FFFFFF');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('fill', '#FFFFFF');
    svg.appendChild(path);
    if(this.svgContainer) this.svgContainer.nativeElement.appendChild(svg);
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
