import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { LayoutComponent} from './layout.component';
import { LayoutRoutingModule} from './layout-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [
    LayoutComponent,
    // ProfileComponent
  ],
  imports: [
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
