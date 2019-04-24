import {Component, ViewChild} from '@angular/core';
import {MapComponent} from '../../../projects/map/src/lib/map.component';

@Component({
  selector: 'app-readme',
  templateUrl: './readme.component.html',
  styleUrls: ['./readme.component.scss']
})
export class ReadmeComponent {

  @ViewChild('angularMap') angularMap: MapComponent;

  private readonly brushes = ['decorationBlue', 'decorationOrange'];

  private currentBrush = -1;

  angularChosenBrush = '';

  constructor() {
  }

  decorateAngular() {
    this.currentBrush = (this.currentBrush + 1) % this.brushes.length;
    this.angularChosenBrush = this.brushes[this.currentBrush];
  }

  decorateComponentDevKit() {
  }
}
