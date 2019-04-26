import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import SignalNotifier from './signal-notifier';

@Component({
  selector: 'highlight-brush',
  template: '',
  styles: []
})
export class BrushComponent implements OnChanges {
  constructor() {
  }

  @Input() readonly brushClass: string;
  @Input() lineWidth?: number;
  @Input() lineCap?: CanvasLineCap;
  @Input() lineJoin?: CanvasLineJoin;
  @Input() strokeStyle?: string | CanvasGradient | CanvasPattern;
  @Input() lineDash?: string | number[];
  @Input() fillStyle?: string | CanvasGradient | CanvasPattern;
  signalNotifier: SignalNotifier;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.signalNotifier) {
      this.signalNotifier.notify();
    }
  }

}

export class BrushWithDefaults {
  private readonly brush: BrushComponent;

  constructor(brush: BrushComponent) {
    this.brush = brush;
  }

  lineDash(): number[] {
    const lineDash = this.getValue<string | number[]>('lineDash', [0]);
    if (typeof lineDash === 'string') {
      return lineDash.split(',').map(value => parseInt(value.trim(), 10));
    } else {
      return lineDash;
    }
  }

  lineCap(): CanvasLineCap {
    return this.getValue<CanvasLineCap>('lineCap', 'round');
  }

  lineWidth(): number {
    return this.getValue<number>('lineWidth', 1);
  }

  lineJoin(): CanvasLineJoin {
    return this.getValue<CanvasLineJoin>('lineJoin', 'round');
  }

  strokeStyle(): string | CanvasGradient | CanvasPattern {
    return this.getValue<string | CanvasGradient | CanvasPattern>('strokeStyle', '#FFFFFF00');
  }

  fillStyle(): string | CanvasGradient | CanvasPattern {
    return this.getValue<string | CanvasGradient | CanvasPattern>('fillStyle', '#FFFFFF00');
  }

  getValue<T>(field: string, defaultValue: T): T {
    if (this.brush && this.brush[field]) {
      return this.brush[field];
    }
    return defaultValue;
  }
}
