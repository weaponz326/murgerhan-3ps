import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
// import { serverTimestamp } from 'firebase/firestore';

// import { PurchasingItem } from 'src/app/models/modules/inventory/inventory.model';
// import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

// import { PurchasingItemFormComponent } from '../purchasing-item-form/purchasing-item-form.component';
// import { SelectStockItemComponent } from 'src/app/components/select-windows/inventory-windows/select-stock-item/select-stock-item.component';


@Component({
  selector: 'app-add-purchasing-item',
  templateUrl: './add-purchasing-item.component.html',
  styleUrls: ['./add-purchasing-item.component.scss']
})
export class AddPurchasingItemComponent {

  constructor(
    // private inventoryApi: InventoryApiService,
    // private formatId: FormatIdService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  // @ViewChild('purchasingItemFormComponentReference', { read: PurchasingItemFormComponent, static: false }) purchasingItemForm!: PurchasingItemFormComponent;
  // @ViewChild('selectStockItemComponentReference', { read: SelectStockItemComponent, static: false }) selectItem!: SelectStockItemComponent;

  isItemSaving = false;

  selectedItemId: any;
  selectedItemData: any;

  openModal(lastId: any){
    // this.purchasingItemForm.purchasingItemForm.controls.itemNumber.setValue(lastId + 1);
    // this.purchasingItemForm.purchasingItemForm.controls.unitPrice.setValue(0.00);
    // this.purchasingItemForm.purchasingItemForm.controls.quantity.setValue(1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    // this.purchasingItemForm.isSaved = true;        

    // if(this.purchasingItemForm.purchasingItemForm.valid && this.selectedItemId){
    //   let data: PurchasingItem = {
    //     created_at: serverTimestamp(),
    //     updated_at: serverTimestamp(),
    //     item_number: this.purchasingItemForm.purchasingItemForm.controls.itemNumber.value as number,
    //     purchasing: sessionStorage.getItem('inventory_purchasing_id') as string,
    //     quantity: this.purchasingItemForm.purchasingItemForm.controls.quantity.value as number,
    //     stock_item: {
    //       id: this.selectedItemId,
    //       data: {
    //         item_code: this.selectedItemData.item_code,
    //         item_name: this.selectedItemData.item_name,
    //         unit_price: this.selectedItemData.unit_price,
    //         item_category: {
    //           id: this.selectedItemData.item_category.id,
    //           data: {
    //             category_code: this.selectedItemData.item_category.data.category_code,
    //             category_name: this.selectedItemData.item_category.data.category_name,
    //           }
    //         }
    //       }
    //     },
    //   }
      
    //   this.saveItemEvent.emit(data);
    // }
  }

  resetForm(){
    // this.purchasingItemForm.purchasingItemForm.controls.itemNumber.setValue(null);
    // this.purchasingItemForm.purchasingItemForm.controls.itemCode.setValue('');
    // this.purchasingItemForm.purchasingItemForm.controls.itemName.setValue('');
    // this.purchasingItemForm.purchasingItemForm.controls.unitPrice.setValue(0.00);
    // this.purchasingItemForm.purchasingItemForm.controls.quantity.setValue(1);
    // this.selectedItemData = null;
  }

  openItemWindow(){
    // // console.log("You are opening select item window")
    // this.selectItem.openModal();
  }

  onItemSelected(itemData: any){
    // console.log(itemData);

    this.selectedItemData = itemData;
    // this.purchasingItemForm.purchasingItemForm.controls.itemCode.setValue(this.formatId.formatId(itemData.data().item_code, 5, "#", "SI"));
    // this.purchasingItemForm.purchasingItemForm.controls.itemName.setValue(itemData.data().item_name);
    // this.purchasingItemForm.purchasingItemForm.controls.unitPrice.setValue(itemData.data().unit_price);

    this.selectedItemId = itemData.id;
    this.selectedItemData = itemData.data();
  }
  
}
