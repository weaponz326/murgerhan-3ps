import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "modules/vendors/orders",
    loadChildren: () => import("./pages/modules/vendors/orders/orders.module").then(m => m.OrdersModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
