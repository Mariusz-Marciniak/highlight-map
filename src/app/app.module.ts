import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldMapDemoComponent } from './world-map-demo/world-map-demo.component';
import {MapHighlightModule} from '../../projects/map-highlight/src/lib/map-highlight.module';
import { SimpleMapDemoComponent } from './simple-map-demo/simple-map-demo.component';
import { ReadmeComponent } from './readme/readme.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapDemoComponent,
    SimpleMapDemoComponent,
    ReadmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapHighlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
