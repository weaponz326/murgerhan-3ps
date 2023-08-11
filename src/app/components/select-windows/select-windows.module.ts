import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModuleUtilitiesModule } from '../module-utilities/module-utilities.module';

import { SelectOrderComponent } from './select-order/select-order.component';
import { SelectProductComponent } from './select-product/select-product.component';
import { SelectPurchasingComponent } from './select-purchasing/select-purchasing.component';
import { SelectBranchComponent } from './select-branch/select-branch.component';
import { SelectStockItemComponent } from './select-stock-item/select-stock-item.component';



@NgModule({
  declarations: [
    SelectOrderComponent,
    SelectProductComponent,
    SelectPurchasingComponent,
    SelectBranchComponent,
    SelectStockItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectOrderComponent,
    SelectProductComponent,
    SelectPurchasingComponent,
    SelectBranchComponent,
    SelectStockItemComponent
  ],
})
export class SelectWindowsModule { }
