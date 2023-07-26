import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
// import { serverTimestamp } from 'firebase/firestore';

// import { PurchasingItem } from 'src/app/models/modules/inventory/inventory.model';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

// import { PurchasingItemFormComponent } from '../purchasing-item-form/purchasing-item-form.component';
// import { SelectStockItemComponent } from 'src/app/components/select-windows/inventory-windows/select-stock-item/select-stock-item.component';


@Component({
  selector: 'app-edit-purchasing-item',
  templateUrl: './edit-purchasing-item.component.html',
  styleUrls: ['./edit-purchasing-item.component.scss']
})
export class EditPurchasingItemComponent {

  constructor(
    // private formatId: FormatIdService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  // @ViewChild('purchasingItemFormComponentReference', { read: PurchasingItemFormComponent, static: false }) purchasingItemForm!: PurchasingItemFormComponent;
  // @ViewChild('selectStockItemComponentReference', { read: SelectStockItemComponent, static: false }) selectItem!: SelectStockItemComponent;

  purchasingItemData: any;

  selectedItemId: any;
  selectedItemData: any;

  isItemSaving = false;

  openModal(data: any){
    this.purchasingItemData = data;
    this.setPurchasingItemData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    // this.purchasingItemForm.isSaved = true;
        
    // if(this.purchasingItemForm.purchasingItemForm.valid && this.selectedItemId){
    //   let data: PurchasingItem = {
    //     created_at: this.purchasingItemData.data().created_at,
    //     updated_at: serverTimestamp(),
    //     item_number: this.purchasingItemForm.purchasingItemForm.controls.itemNumber.value as number,
    //     purchasing: sessionStorage.getItem('inventory_purchasing_id') as string,
    //     quantity: this.purchasingItemForm.purchasingItemForm.controls.quantity.value as number,
    //     stock_item: {
    //       id: this.selectedItemData.id,
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
  
    //   let item = {
    //     id: this.purchasingItemData.id,
    //     data: data
    //   }
  
    //   this.saveItemEvent.emit(item);
    // }
  }

  setPurchasingItemData(data: any){
    // this.purchasingItemForm.purchasingItemForm.controls.itemNumber.setValue(data.data().item_number);
    // this.purchasingItemForm.purchasingItemForm.controls.itemCode.setValue(data.data().stock_item?.data.item_code);
    // this.purchasingItemForm.purchasingItemForm.controls.itemName.setValue(data.data().stock_item?.data.item_name);
    // this.purchasingItemForm.purchasingItemForm.controls.unitPrice.setValue(data.data().stock_item?.data.unit_price);
    // this.purchasingItemForm.purchasingItemForm.controls.quantity.setValue(data.data().quantity);
    
    this.selectedItemId = data.data().stock_item.id;
    this.selectedItemData = data.data().stock_item.data;
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
