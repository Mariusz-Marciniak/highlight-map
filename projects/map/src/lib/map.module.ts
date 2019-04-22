import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AreaComponent } from './area.component';
import {BrushComponent} from './brush.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [MapComponent, AreaComponent, BrushComponent],
  imports: [
    CommonModule
  ],
  exports: [MapComponent, AreaComponent, BrushComponent]
})
export class MapModule { }
