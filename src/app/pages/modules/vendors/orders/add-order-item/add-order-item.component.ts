import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { OrderItem } from 'src/app/models/modules/vendors/vendors.model';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { OrderItemFormComponent } from '../order-item-form/order-item-form.component';
import { SelectFactoryItemComponent } from 'src/app/components/select-windows/select-factory-item/select-factory-item.component';


@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.scss']
})
export class AddOrderItemComponent {

  constructor(
    private formatId: FormatIdService,
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('orderItemFormComponentReference', { read: OrderItemFormComponent, static: false }) orderItemForm!: OrderItemFormComponent;
  @ViewChild('selectFactoryItemComponentReference', { read: SelectFactoryItemComponent, static: false }) selectItem!: SelectFactoryItemComponent;

  isItemSaving = false;

  selecteditemId: any;
  selecteditemData: any;

  openModal(lastId: any){
    this.orderItemForm.orderItemForm.controls.itemNumber.setValue(lastId + 1);
    this.orderItemForm.orderItemForm.controls.price.setValue(0.00);
    this.orderItemForm.orderItemForm.controls.vat.setValue(0.00);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    this.orderItemForm.isSaved = true;    

    if(this.orderItemForm.orderItemForm.valid && this.selecteditemId){
      let data: OrderItem = {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        item_number: this.orderItemForm.orderItemForm.controls.itemNumber.value as number,
        order: sessionStorage.getItem('vendors_order_id') as string,
        quantity: this.orderItemForm.orderItemForm.controls.quantity.value as number,
        factory_item: {
          id: this.selecteditemId,
          data: {
            item_code: this.selecteditemData.item_code,
            item_name: this.selecteditemData.item_name,
            price: this.selecteditemData.price,
            vat: this.selecteditemData.vat,
          }
        },
      }
      
      this.saveItemEvent.emit(data);
    }
  }

  resetForm(){
    this.orderItemForm.orderItemForm.controls.itemNumber.setValue(null);
    this.orderItemForm.orderItemForm.controls.itemCode.setValue('');
    this.orderItemForm.orderItemForm.controls.itemName.setValue('');
    this.orderItemForm.orderItemForm.controls.price.setValue(0.00);
    this.orderItemForm.orderItemForm.controls.vat.setValue(0.00);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(1);
    this.selecteditemId = null;
    this.selecteditemData = null;
  }

  openItemWindow(){
    // console.log("You are opening select item window")
    this.selectItem.openModal();
  }

  onItemSelected(itemData: any){
    // console.log(itemData);

    this.selecteditemData = itemData;
    this.orderItemForm.orderItemForm.controls.itemCode.setValue(this.formatId.formatId(itemData.data().item_code, 4, "#", "FI"));
    this.orderItemForm.orderItemForm.controls.itemName.setValue(itemData.data().item_name);
    this.orderItemForm.orderItemForm.controls.price.setValue(itemData.data().price);
    this.orderItemForm.orderItemForm.controls.vat.setValue(itemData.data().vat);

    this.selecteditemId = itemData.id;
    this.selecteditemData = itemData.data();
  }
  
}
