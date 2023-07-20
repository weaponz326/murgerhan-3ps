import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { OrdersPage } from './orders.page';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { AddOrderItemComponent } from './add-order-item/add-order-item.component';
import { EditOrderItemComponent } from './edit-order-item/edit-order-item.component';
import { OrderItemFormComponent } from './order-item-form/order-item-form.component';


@NgModule({
  declarations: [
    OrdersPage,
    AllOrdersComponent,
    AddOrderComponent,
    ViewOrderComponent,
    OrderItemsComponent,
    AddOrderItemComponent,
    EditOrderItemComponent,
    OrderItemFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OrdersRoutingModule,
    ModuleUtilitiesModule,
  ]
})
export class OrdersModule { }
