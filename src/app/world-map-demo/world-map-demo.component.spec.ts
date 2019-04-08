import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMapDemoComponent } from './world-map-demo.component';

describe('WorldMapDemoComponent', () => {
  let component: WorldMapDemoComponent;
  let fixture: ComponentFixture<WorldMapDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldMapDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
