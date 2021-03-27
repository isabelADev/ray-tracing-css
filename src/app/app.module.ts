import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RayTraceModule} from './ray-trace-graph/ray-trace.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RayTraceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
