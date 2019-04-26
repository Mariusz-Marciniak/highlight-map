import {Component} from '@angular/core';

@Component({
  selector: 'app-readme',
  templateUrl: './readme.component.html',
  styleUrls: ['./readme.component.scss']
})
export class ReadmeComponent {

  private readonly brushClasses = ['decorationBlue', 'decorationOrange'];

  private readonly brushProperties = [
    {lineDash: [2, 4, 3], strokeStyle: 'red', fillStyle: 'orange', lineWidth: 3},
    {strokeStyle: 'pink', fillStyle: 'cyan', lineWidth: 1},
  ];

  private currentBrush = -1;
  private currentBrushProps = -1;

  angularChosenBrush = '';
  brushLineDash: string | number[];
  brushFillStyle: string | CanvasGradient | CanvasPattern;
  brushStrokeStyle: string | CanvasGradient | CanvasPattern;
  brushLineWidth: number;


  constructor() {
  }

  brushChangeOnArea() {
    this.currentBrush = (this.currentBrush + 1) % this.brushClasses.length;
    this.angularChosenBrush = this.brushClasses[this.currentBrush];
  }

  changesOfBrushProperties() {
    this.currentBrushProps = (this.currentBrushProps + 1) % this.brushProperties.length;
    this.brushFillStyle = this.brushProperties[this.currentBrushProps].fillStyle;
    this.brushStrokeStyle = this.brushProperties[this.currentBrushProps].strokeStyle;
    this.brushLineWidth = this.brushProperties[this.currentBrushProps].lineWidth;
    this.brushLineDash = this.brushProperties[this.currentBrushProps].lineDash;
  }
}
