import {Component, ViewChild} from '@angular/core';
import {MapComponent} from '../../../projects/map/src/lib/map.component';

@Component({
  selector: 'app-readme',
  templateUrl: './readme.component.html',
  styleUrls: ['./readme.component.scss']
})
export class ReadmeComponent {

  constructor() {
  }

  @ViewChild('angularMap') angularMap: MapComponent;

  decorate() {
    this.angularMap.areas.forEach(area => {
      area.brushClass = 'decorated';
    });
    this.angularMap.initCanvas();
  }

}
