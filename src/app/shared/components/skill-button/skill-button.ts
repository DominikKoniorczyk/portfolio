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
  @Input() svgWidth: number = 48;
  @Input() svgHeight: number = 48;
  svgPath: string = "";

  constructor(private svgPaths: TechnologiesSvg){}

  ngAfterViewInit(){
    this.svgPath = this.svgPaths.returnPath(this.svgType);
  }

  @HostBinding('style.--svg_width')
  get buttonWidth(){
    return this.svgWidth;
  }

  @HostBinding('style.--svg_height')
  get buttonHeight(){
    return this.svgHeight;
  }
}
