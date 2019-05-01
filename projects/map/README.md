# highlight-map 
  highlight-map is component written in Angular 7 outlining areas defined in map.
  It allows you to define different types of brushes that can be assigned to individual areas.

  The main idea is based on https://github.com/kemayo/maphilight.
  However it provides different configuration options and some additional functionalities. This library only supports poly shaped areas.

## Demo 
Demo project: https://github.com/Mariusz-Marciniak/highlight-map
Deployed demo: https://highlight-map.herokuapp.com/ 

## Features
 - *customizable highlight for areas* - define `highlight-brush` component with specific `brushClass` this brush will be used for all `highlight-area`s having the same `brushClass`
 - *on hover brushes* - define brush used on mouseover events by adding `:hover` to `brushClass`
 - *default brushes* - brush with empty, undefined or set to `default-brush` `brushClass` is used as default;
  this brush will be used for all `highlight-area`s without defined matching brush; similarly brush with
  `brushClass` set to `:hover` or `default-brush:hover` will be used as default for on mouseover events
 - *inactive areas* - it is possible to mark area as `inactive="true"`; such a area is disabled and does not react to on mouseover events

## Usage
```html
<highlight-map src="/assets/angular.png" name="angular-img">
  <highlight-brush brushClass="fooBrush" fillStyle="blue"></highlight-brush>
  <highlight-brush brushClass="fooBrush:hover" strokeStyle="red" fillStyle="orange"></highlight-brush>
  <highlight-brush brushClass="" fillStyle="yellow"></highlight-brush>
  <highlight-area brushClass="fooBrush" inactive="true" coords="34,153, 58,153, 56,104"></highlight-area>
  <highlight-area coords="93,20, 56,104, 77,104"></highlight-area>
  <highlight-area brushClass="fooBrush" inactive="true" coords="131,104, 93,20, 93,70"></highlight-area>
</highlight-map>
```

### Brush properties 
| Property | Type |
| ------ | ------ |
| lineWidth | number |
| lineCap | CanvasLineCap |
| lineJoin | CanvasLineJoin |
| strokeStyle | string \|  CanvasGradient \| CanvasPattern |
| lineDash | string \| number[] |
| fillStyle | string \| CanvasGradient \| CanvasPattern |

## Install library
Run `npm install @marciniak/map` 

## Changelog
- 0.9.2 default brush class named as default-brush
- 0.9.1 layout bug fixes:
  - overwritten text-align property of parent component
  - synchronize parent div size with image size
- 0.9.0 initial version

## Tested with
- Firefox
- Chrome

## Not supported
- Microsoft Edge
