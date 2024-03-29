import {AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, ViewChild} from '@angular/core';
import {BrushComponent, BrushWithDefaults} from './brush.component';
import {AreaComponent} from './area.component';
import SignalNotifier from './signal-notifier';

@Component({
  selector: 'highlight-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mainContainer') private mainContainer: ElementRef;

  @ViewChild('canvasMap') private canvasMap: ElementRef;

  @ViewChild('highlightedImage') private highlightedImage: ElementRef;

  @ContentChildren(AreaComponent) areas: QueryList<AreaComponent>;

  @ContentChildren(BrushComponent) brushes: QueryList<BrushComponent>;

  private brushesMap: { [key: string]: BrushComponent; } = {};

  private context: CanvasRenderingContext2D;

  private static readonly defaultBrush = 'default-brush';
  private static readonly hoverAttribute = ':hover';

  private readonly signalNotifier: SignalNotifier;

  @Input() src: string;
  @Input() name: string;

  constructor() {
    this.signalNotifier = new SignalNotifier(100, this.repaint.bind(this));
  }

  ngAfterViewInit(): void {
    this.context = this.canvasMap.nativeElement.getContext('2d');
    this.mainContainer.nativeElement.style.backgroundImage = `url(${this.src})`;
    this.prepareBrushesMap();
    this.reorderLayers();
    this.areas.forEach(area => {
      area.signalNotifier = this.signalNotifier;
    });

    this.brushes.forEach(brush => {
      brush.signalNotifier = this.signalNotifier;
    });
  }

  mapOut() {
    this.repaint();
    this.reorderLayers();
  }

  mapOver(event) {
    this.repaint();
    const area = this.findAreaByCoords(event.target.coords);
    const brush = this.findHoverBrush(area);
    this.initContext(brush);
    this.drawCoords(event.target.coords.split(','));
    this.reorderLayers();
  }

  repaint() {
    if (this.canvasMap !== null) {
      this.mainContainer.nativeElement.style.width = `${this.highlightedImage.nativeElement.width}px`;
      this.mainContainer.nativeElement.style.height = `${this.highlightedImage.nativeElement.height}px`;
      this.canvasMap.nativeElement.width = this.highlightedImage.nativeElement.width;
      this.canvasMap.nativeElement.height = this.highlightedImage.nativeElement.height;
    }
    this.drawInitialAreas();
  }

  private drawInitialAreas() {
    this.areas.forEach(area => {
      const brush = this.brushesMap[area.brushClass] ? this.brushesMap[area.brushClass] : this.brushesMap[MapComponent.defaultBrush];
      if (brush) {
        this.initContext(new BrushWithDefaults(brush));
        this.drawCoords(area.coords.split(',').map(value => parseInt(value, 10)));
      }
    });
  }

  private findHoverBrush(area) {
    let brush: BrushWithDefaults;
    if (area !== undefined && this.brushesMap[area.brushClass + MapComponent.hoverAttribute] !== undefined) {
      brush = new BrushWithDefaults(this.brushesMap[area.brushClass + MapComponent.hoverAttribute]);
    } else {
      brush = new BrushWithDefaults(this.brushesMap[MapComponent.defaultBrush + MapComponent.hoverAttribute]);
    }
    return brush;
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

  private reorderLayers() {
    this.highlightedImage.nativeElement.before(this.canvasMap.nativeElement);
  }

  private findAreaByCoords(coords: string): AreaComponent {
    return this.areas.find(area => area.coords === coords);
  }

  private prepareBrushesMap() {
    this.brushes.forEach(item => {
      if(item.brushClass === undefined || item.brushClass === '') {
        this.brushesMap[MapComponent.defaultBrush] = item;
      } else if (item.brushClass === MapComponent.hoverAttribute) {
        this.brushesMap[MapComponent.defaultBrush + MapComponent.hoverAttribute] = item;
      } else {
        this.brushesMap[item.brushClass] = item;
      }
    });
  }

}
