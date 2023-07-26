import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchasingPage } from './purchasing.page';
import { AllPurchasingComponent } from './all-purchasing/all-purchasing.component';
import { AddPurchasingItemComponent } from './add-purchasing-item/add-purchasing-item.component';
import { ViewPurchasingComponent } from './view-purchasing/view-purchasing.component';
import { PurchasingQualityChecksComponent } from './purchasing-quality-checks/purchasing-quality-checks.component';
import { PurchasingCheckImagesComponent } from './purchasing-check-images/purchasing-check-images.component';

// import { viewPurchasingGuard } from 'src/app/guards/modules/inventory/view-purchasing/view-purchasing.guard';


const routes: Routes = [
  { 
    path: "", 
    component: PurchasingPage,
    children: [
      { path: "", component: AllPurchasingComponent },
      { path: "all-purchasing", component: AllPurchasingComponent },
      { path: "add-purchasing", component: AddPurchasingItemComponent },
      { path: "view-purchasing", component: ViewPurchasingComponent },
      { path: "quality-checks", component: PurchasingQualityChecksComponent },
      { path: "quality-check-images", component: PurchasingCheckImagesComponent },
      // { path: "view-purchasing", component: ViewPurchasingComponent, canActivate: [viewPurchasingGuard] },
      // { path: "quality-checks", component: PurchasingQualityChecksComponent, canActivate: [viewPurchasingGuard] },
      // { path: "quality-check-images", component: PurchasingCheckImagesComponent, canActivate: [viewPurchasingGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasingRoutingModule { }
