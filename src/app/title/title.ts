import { Component } from '@angular/core';
import { AnimatedButton } from '../shared/components/animated-button/animated-button';

@Component({
  selector: 'app-title',
  imports: [AnimatedButton],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title {

}
