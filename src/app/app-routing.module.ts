import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorldMapDemoComponent} from './world-map-demo/world-map-demo.component';
import {SimpleMapDemoComponent} from './simple-map-demo/simple-map-demo.component';
import {ReadmeComponent} from './readme/readme.component';

const routes: Routes = [
  { path: 'simple', component: SimpleMapDemoComponent },
  { path: 'world-map', component: WorldMapDemoComponent },
  { path: '**', component: ReadmeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
