import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import SignalNotifier from './signal-notifier';

@Component({
  selector: 'highlight-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnChanges {
  constructor() {
  }

  signalNotifier: SignalNotifier;
  @Input() href: string;
  @Input() brushClass: string;
  @Input() title: string;
  @Input() alt: string;
  @Input() coords: string;
  @Input() inactive: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.signalNotifier && changes.brushClass) {
      this.signalNotifier.notify();
    }
  }

}
