import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { LayoutComponent} from './layout.component';
import { LayoutRoutingModule} from './layout-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {CommonModule} from '@angular/common';
import { DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [
    LayoutComponent,
    // ProfileComponent
  ],
  imports: [
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
