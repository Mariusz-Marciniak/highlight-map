import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AreaComponent } from './area.component';
import {BrushComponent} from './brush.component';

@NgModule({
  declarations: [MapComponent, AreaComponent, BrushComponent],
  imports: [
  ],
  exports: [MapComponent, AreaComponent, BrushComponent]
})
export class MapModule { }
