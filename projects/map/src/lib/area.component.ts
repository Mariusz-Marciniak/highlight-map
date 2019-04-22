import {Component, Input} from '@angular/core';

@Component({
  selector: 'highlight-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent {
  constructor() {
  }

  @Input() href: string;
  @Input() brushClass: string;
  @Input() title: string;
  @Input() alt: string;
  @Input() coords: string;
  @Input() inactive: boolean;
}
