import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AreaComponent } from './area.component';

@NgModule({
  declarations: [MapComponent, AreaComponent],
  imports: [
  ],
  exports: [MapComponent, AreaComponent]
})
export class MapModule { }
