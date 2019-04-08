export interface MapHighlightBrush {
  lineWidth?: number;
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  lineDash?: number[];
  fillStyle?: string | CanvasGradient | CanvasPattern;

}

export class MapHighlightBrushWithDefaults {
  private readonly brush: object;

  constructor(brush: MapHighlightBrush) {
    if (brush) {
      try {
        this.brush = JSON.parse(brush as string);
      } catch (Error) {
        console.error('Incorrect JSON object:' + brush);
        this.brush = JSON.parse('{}');
      }
    } else {
      this.brush = JSON.parse('{}');
    }
  }

  lineDash(): number[] {
    return this.getValue<number[]>('lineDash', [0]);
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
    return this.getValue<string | CanvasGradient | CanvasPattern>('strokeStyle', '#000000');
  }

  fillStyle(): string | CanvasGradient | CanvasPattern {
    return this.getValue<string | CanvasGradient | CanvasPattern>('fillStyle', '#FF000033');
  }

  getValue<T>(field: string, defaultValue: T): T {
    if (this.brush[field]) {
      return this.brush[field];
    }
    return defaultValue;
  }
}
