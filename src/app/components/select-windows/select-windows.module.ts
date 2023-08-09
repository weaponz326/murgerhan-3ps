import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule
  ]
})
export class SelectWindowsModule { }
