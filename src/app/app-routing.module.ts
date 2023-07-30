import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "modules/vendors/orders",
    loadChildren: () => import("./pages/modules/vendors/orders/orders.module").then(m => m.OrdersModule)
  },
  {
    path: "modules/suppliers/purchasing",
    loadChildren: () => import("./pages/modules/suppliers/purchasing/purchasing.module").then(m => m.PurchasingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
