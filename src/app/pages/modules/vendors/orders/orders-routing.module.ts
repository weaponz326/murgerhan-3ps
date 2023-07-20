import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersPage } from './orders.page';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';

// import { viewOrderGuard } from 'src/app/guards/modules/orders/view-order/view-order.guard';


const routes: Routes = [
  { 
    path: "", 
    component: OrdersPage,
    children: [
      { path: "", component: AllOrdersComponent },
      { path: "all-orders", component: AllOrdersComponent },
      { path: "view-order", component: ViewOrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
