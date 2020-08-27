import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CakemakerComponent} from './cakemaker.component';
import { CakemakerRoutingModule} from './cakemaker-routing.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    CakemakerComponent
  ],
    imports: [
        CakemakerRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
  providers: [],
  bootstrap: [CakemakerComponent]
})
export class CakemakerModule { }
