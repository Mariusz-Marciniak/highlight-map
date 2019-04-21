import {AfterContentInit, Component, ContentChildren, ElementRef, Input, QueryList, ViewChild} from '@angular/core';
import {BrushComponent, BrushWithDefaults} from './brush.component';
import {AreaComponent} from './area.component';

@Component({
  selector: 'highlight-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterContentInit {
  @ViewChild('mainContainer') private mainContainer: ElementRef;

  @ViewChild('canvasMap') private canvasMap: ElementRef;

  @ViewChild('highlightedImage') private highlightedImage: ElementRef;

  @ContentChildren(AreaComponent) private areas: QueryList<AreaComponent>;

  @ContentChildren(BrushComponent) private brushes: QueryList<BrushComponent>;

  private brushesMap: { [key: string]: BrushComponent; } = {};

  private context: CanvasRenderingContext2D;

  @Input() src: string;
  @Input() name: string;

  constructor() {
  }

  ngAfterContentInit(): void {
    this.context = this.canvasMap.nativeElement.getContext('2d');
    this.mainContainer.nativeElement.style.backgroundImage = 'url(' + this.src + ')';
    this.prepareBrushesMap();
    this.updateIndexes();
  }

  mapOut() {
    this.context.restore();
    this.updateIndexes();
  }

  mapOver(event) {
    if (this.canvasMap !== null) {
      this.canvasMap.nativeElement.width = this.highlightedImage.nativeElement.width;
      this.canvasMap.nativeElement.height = this.highlightedImage.nativeElement.height;
    }
    const area = this.findAreaByCoords(event.target.coords);
    let brush: BrushWithDefaults;
    if (area !== undefined && this.brushesMap[area.brushClass + ':hover'] !== undefined) {
      brush = new BrushWithDefaults(this.brushesMap[area.brushClass + ':hover']);
    } else {
      brush = new BrushWithDefaults(this.brushesMap[':hover']);
    }
    this.initContext(brush);
    this.drawCoords(event.target.coords.split(','));
    this.updateIndexes();
  }

  private initContext(brush: BrushWithDefaults) {
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

  private findAreaByCoords(coords: string | Coordinates): AreaComponent {
    return this.areas.find(area => area.coords === coords);
  }

  private prepareBrushesMap() {
    this.brushes.forEach(item => this.brushesMap[item.brushClass] = item);
  }
}
