import {AfterContentInit, Component, ContentChild, ElementRef, Input, ViewChild} from '@angular/core';
import {MapHighlightBrush, MapHighlightBrushWithDefaults} from './map-highlight-brush';

@Component({
  selector: 'highlight-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent {
  constructor() {
  }

  @Input() href: string;
  @Input() title: string;
  @Input() coords: string;
}
