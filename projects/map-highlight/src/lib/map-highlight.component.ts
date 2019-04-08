import {AfterContentInit, Component, ContentChild, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'lib-map-highlight',
  template: `
    <div class="map-highlight-container" #mainContainer>
      <img src="{{src}}" useMap="{{useMap}}" class="map-highlight-image" #highlightedImage>
      <canvas class="map-highlight-canvas" #canvasMap></canvas>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./map-highlight.component.scss']
})
export class MapHighlightComponent implements AfterContentInit {
  @ViewChild('mainContainer') private mainContainer: ElementRef;

  @ViewChild('canvasMap') private canvasForImg: ElementRef;

  @ViewChild('highlightedImage') private image: ElementRef;

  @ContentChild('highlightMap') private imageMap: ElementRef;

  private context: CanvasRenderingContext2D;

  @Input() src: string;
  @Input() useMap: string;

  constructor() {
  }

  ngAfterContentInit(): void {
    if (this.imageMap !== null) {
      this.imageMap.nativeElement.addEventListener('mouseover', this.onMapOver.bind(this));
      this.imageMap.nativeElement.addEventListener('mouseout', this.onMapOut.bind(this));
      this.context = this.canvasForImg.nativeElement.getContext('2d');
    }
    this.mainContainer.nativeElement.style.backgroundImage = 'url(' + this.src + ')';
    this.updateIndexes();
  }

  onMapOut(event) {
    this.context.restore();
    this.updateIndexes();
  }

  onMapOver(event) {
    if (this.canvasForImg !== null) {
      this.canvasForImg.nativeElement.width = this.image.nativeElement.width;
      this.canvasForImg.nativeElement.height = this.image.nativeElement.height;
    }
    this.drawCoords(event.target.coords.split(','), '#FF0000');
    this.updateIndexes();
  }

  drawCoords(coords, color) {
    this.context.clearRect(0, 0, this.canvasForImg.nativeElement.width, this.canvasForImg.nativeElement.height);
    this.context.beginPath();
    let i = 0;
    while (i < coords.length) {
      this.context.lineTo(coords[i], coords[i + 1]);
      i += 2;
    }
    this.context.fillStyle = color;
    this.context.stroke();

    this.context.closePath();
    this.context.fill();
  }

  updateIndexes() {
    this.image.nativeElement.before(this.canvasForImg.nativeElement);
  }

}
