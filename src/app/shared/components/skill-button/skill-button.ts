import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
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
  svgPath: string = "M25.2 45.2984L38.136 41.7816L39.8804 22.8032H16.8728L16.3016 16.492H40.4544L41.09 10.3012H9.31L11.0908 28.9996H32.9868L32.256 37.0244L25.2 38.892L18.144 37.0244L17.7016 31.8612H11.3456L12.2668 41.7844L25.2 45.2984ZM0 0H50.4L45.8556 50.4L25.2 56L4.5444 50.4L0 0Z";
  view : {x: number, y: number, w: number, h: number} = { x: 0, y: 0, w: 100, h: 100};
  text: string = "HTML";

  constructor(private svgPaths: TechnologiesSvg){
    this.svgPath = this.svgPaths.returnPath(this.svgType);
    this.view = this.svgPaths.returnViewBox(this.svgType);
  }

  ngAfterViewInit(){}

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
