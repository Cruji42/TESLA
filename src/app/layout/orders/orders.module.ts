import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { OrdersComponent} from './orders.component';
import { OrdersRoutingModule} from './orders-routing.module';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [OrdersComponent]
})
export class OrdersModule { }
