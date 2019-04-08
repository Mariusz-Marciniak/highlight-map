import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMapDemoComponent } from './simple-map-demo.component';

describe('SimpleMapDemoComponent', () => {
  let component: SimpleMapDemoComponent;
  let fixture: ComponentFixture<SimpleMapDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleMapDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
