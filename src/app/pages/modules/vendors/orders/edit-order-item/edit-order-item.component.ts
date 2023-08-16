import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { OrderItem } from 'src/app/models/modules/vendors/vendors.model';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { OrderItemFormComponent } from '../order-item-form/order-item-form.component';
import { SelectFactoryItemComponent } from 'src/app/components/select-windows/select-factory-item/select-factory-item.component';


@Component({
  selector: 'app-edit-order-item',
  templateUrl: './edit-order-item.component.html',
  styleUrls: ['./edit-order-item.component.scss']
})
export class EditOrderItemComponent {

  constructor(
    private formatId: FormatIdService,
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('orderItemFormComponentReference', { read: OrderItemFormComponent, static: false }) orderItemForm!: OrderItemFormComponent;
  @ViewChild('selectFactoryItemComponentReference', { read: SelectFactoryItemComponent, static: false }) selectItem!: SelectFactoryItemComponent;

  orderItemData: any;
  
  selectedItemId: any;
  selectedItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.orderItemData = data;
    this.setOrderItemData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    this.orderItemForm.isSaved = true;        

    if(this.orderItemForm.orderItemForm.valid && this.selectedItemId){
      let data: OrderItem = {
        created_at: this.orderItemData.data().created_at,
        updated_at: serverTimestamp(),
        item_number: this.orderItemForm.orderItemForm.controls.itemNumber.value as number,
        order: sessionStorage.getItem('vendors_order_id') as string,
        quantity: this.orderItemForm.orderItemForm.controls.quantity.value as number,
        factory_item: {
          id: this.selectedItemId,
          data: {
            item_code: this.selectedItemData.item_code,
            item_name: this.selectedItemData.item_name,
            price: this.selectedItemData.price,
            vat: this.selectedItemData.vat,
          }
        },
      }
  
      let item = {
        id: this.orderItemData.id,
        data: data
      }
      
      this.saveItemEvent.emit(item);
    }
  }

  setOrderItemData(data: any){
    this.orderItemForm.orderItemForm.controls.itemNumber.setValue(data.data().item_number);
    this.orderItemForm.orderItemForm.controls.itemCode.setValue(this.formatId.formatId(data.data().item?.data.item_code, 4, "#", "PR"));
    this.orderItemForm.orderItemForm.controls.itemName.setValue(data.data().item?.data.item_name);
    this.orderItemForm.orderItemForm.controls.price.setValue(data.data().item.data.price);
    this.orderItemForm.orderItemForm.controls.vat.setValue(data.data().item.data.vat);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(data.data().quantity);

    this.selectedItemId = data.data().item.id;
    this.selectedItemData = data.data().item.data;
  }
  
  openItemWindow(){
    // console.log("You are opening select item window")
    this.selectItem.openModal();
  }

  onItemSelected(itemData: any){
    // console.log(itemData);

    this.orderItemForm.orderItemForm.controls.itemCode.setValue(this.formatId.formatId(itemData.data().item_code, 4, "#", "PR"));
    this.orderItemForm.orderItemForm.controls.itemName.setValue(itemData.data().item_name);
    this.orderItemForm.orderItemForm.controls.price.setValue(itemData.data().price);
    this.orderItemForm.orderItemForm.controls.vat.setValue(itemData.data().vat);

    this.selectedItemId = itemData.id;
    this.selectedItemData = itemData.data();
  }

}
