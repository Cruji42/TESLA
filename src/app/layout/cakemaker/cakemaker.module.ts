import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CakemakerComponent} from './cakemaker.component';
import { CakemakerRoutingModule} from './cakemaker-routing.module';
import {CommonModule} from '@angular/common';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';

export function highchrtsModules() {
  return [more];
}


@NgModule({
  declarations: [
    CakemakerComponent
  ],
    imports: [
        CakemakerRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
      ChartModule
    ],
  providers: [ { provide: HIGHCHARTS_MODULES, useFactory: highchrtsModules }],
  bootstrap: [CakemakerComponent]
})
export class CakemakerModule { }
