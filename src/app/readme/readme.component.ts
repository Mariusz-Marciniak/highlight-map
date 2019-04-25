import {Component, ViewChild} from '@angular/core';
import {MapComponent} from '../../../projects/map/src/lib/map.component';
import {BrushComponent} from '../../../projects/map/src/lib/brush.component';

@Component({
  selector: 'app-readme',
  templateUrl: './readme.component.html',
  styleUrls: ['./readme.component.scss']
})
export class ReadmeComponent {

  @ViewChild('angularMap') angularMap: MapComponent;

  @ViewChild('componentDevKitBrush') componentDevKitBrush: BrushComponent;

  private readonly brushClasses = ['decorationBlue', 'decorationOrange'];

  private readonly brushProperties = [
    {lineDash: [2, 4, 3], strokeStyle: 'red', fillStyle: 'orange'},
    {strokeStyle: 'pink', fillStyle: 'cyan'},
  ];

  private currentBrush = -1;
  private currentBrushProps = -1;

  angularChosenBrush = '';

  constructor() {
  }

  brushChangeOnArea() {
    this.currentBrush = (this.currentBrush + 1) % this.brushClasses.length;
    this.angularChosenBrush = this.brushClasses[this.currentBrush];
  }

  changesOfBrushProperties() {
    this.currentBrushProps = (this.currentBrushProps + 1) % this.brushProperties.length;
    this.componentDevKitBrush.fillStyle = this.brushProperties[this.currentBrushProps].fillStyle;
    this.componentDevKitBrush.strokeStyle = this.brushProperties[this.currentBrushProps].strokeStyle;
    this.componentDevKitBrush.lineDash = this.brushProperties[this.currentBrushProps].lineDash;
  }
}
