import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PurchasingRoutingModule } from './purchasing-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
// import { InventoryWindowsModule } from 'src/app/components/select-windows/inventory-windows/inventory-windows.module';

import { PurchasingPage } from './purchasing.page';
import { AllPurchasingComponent } from './all-purchasing/all-purchasing.component';
import { NewPurchasingComponent } from './new-purchasing/new-purchasing.component';
import { ViewPurchasingComponent } from './view-purchasing/view-purchasing.component';
import { PurchasingItemsComponent } from './purchasing-items/purchasing-items.component';
import { AddPurchasingItemComponent } from './add-purchasing-item/add-purchasing-item.component';
import { EditPurchasingItemComponent } from './edit-purchasing-item/edit-purchasing-item.component';
import { PurchasingQualityChecksComponent } from './purchasing-quality-checks/purchasing-quality-checks.component';
import { PurchasingItemFormComponent } from './purchasing-item-form/purchasing-item-form.component';
import { PurchasingCheckImagesComponent } from './purchasing-check-images/purchasing-check-images.component';


@NgModule({
  declarations: [
    PurchasingPage,
    AllPurchasingComponent,
    NewPurchasingComponent,
    ViewPurchasingComponent,
    PurchasingItemsComponent,
    AddPurchasingItemComponent,
    EditPurchasingItemComponent,
    PurchasingQualityChecksComponent,
    PurchasingItemFormComponent,
    PurchasingCheckImagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PurchasingRoutingModule,
    ModuleUtilitiesModule,
    // InventoryWindowsModule
  ]
})
export class PurchasingModule { }
