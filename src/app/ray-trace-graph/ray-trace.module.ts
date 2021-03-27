import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RayTraceGraphComponent} from './ray-trace-graph.component';

@NgModule({
  declarations: [RayTraceGraphComponent],
  imports: [CommonModule],
  exports: [RayTraceGraphComponent]
})
export class RayTraceModule {
}
