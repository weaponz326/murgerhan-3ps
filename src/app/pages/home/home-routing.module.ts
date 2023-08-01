import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: "",
    component: HomePage,
    children: [
      {
        path: "vendors/orders",
        loadChildren: () => import("../../pages/modules/vendors/orders/orders.module").then(m => m.OrdersModule)
      },
      {
        path: "suppliers/purchasing",
        loadChildren: () => import("../../pages/modules/suppliers/purchasing/purchasing.module").then(m => m.PurchasingModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
