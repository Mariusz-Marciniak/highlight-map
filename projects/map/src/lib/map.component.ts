import {AfterContentInit, Component, ContentChild, ElementRef, Input, ViewChild} from '@angular/core';
import {MapHighlightBrush, MapHighlightBrushWithDefaults} from './map-highlight-brush';

@Component({
  selector: 'highlight-map',
  template: `
    <div class="map-highlight-container" #mainContainer>
      <img src="{{src}}" useMap="{{useMap}}" class="map-highlight-image" #highlightedImage>
      <canvas class="map-highlight-canvas" #canvasMap></canvas>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterContentInit {
  @ViewChild('mainContainer') private mainContainer: ElementRef;

  @ViewChild('canvasMap') private canvasMap: ElementRef;

  @ViewChild('highlightedImage') private highlightedImage: ElementRef;

  @ContentChild('highlightMap') private highlightMap: ElementRef;

  private context: CanvasRenderingContext2D;

  @Input() mouseOverBrush: MapHighlightBrush;

  @Input() src: string;
  @Input() useMap: string;

  constructor() {
  }

  ngAfterContentInit(): void {
    if (this.highlightMap !== null) {
      this.highlightMap.nativeElement.addEventListener('mouseover', this.onMapOver.bind(this));
      this.highlightMap.nativeElement.addEventListener('mouseout', this.onMapOut.bind(this));
      this.context = this.canvasMap.nativeElement.getContext('2d');
    }
    this.mainContainer.nativeElement.style.backgroundImage = 'url(' + this.src + ')';
    this.updateIndexes();
  }

  onMapOut() {
    this.context.restore();
    this.updateIndexes();
  }

  onMapOver(event) {
    if (this.canvasMap !== null) {
      this.canvasMap.nativeElement.width = this.highlightedImage.nativeElement.width;
      this.canvasMap.nativeElement.height = this.highlightedImage.nativeElement.height;
    }
    this.initContext(new MapHighlightBrushWithDefaults(this.mouseOverBrush));
    this.drawCoords(event.target.coords.split(','));
    this.updateIndexes();
  }

  private initContext(brush: MapHighlightBrushWithDefaults) {
    this.context.setLineDash(brush.lineDash());
    this.context.strokeStyle = brush.strokeStyle();
    this.context.fillStyle = brush.fillStyle();
    this.context.lineCap = brush.lineCap();
    this.context.lineWidth = brush.lineWidth();
    this.context.lineJoin = brush.lineJoin();
  }

  private drawCoords(coords: number[]) {
    this.context.beginPath();
    let i = 0;
    while (i < coords.length) {
      this.context.lineTo(coords[i], coords[i + 1]);
      i += 2;
    }
    this.context.closePath();
    this.context.stroke();

    this.context.fill();
  }

  private updateIndexes() {
    this.highlightedImage.nativeElement.before(this.canvasMap.nativeElement);
  }

}
