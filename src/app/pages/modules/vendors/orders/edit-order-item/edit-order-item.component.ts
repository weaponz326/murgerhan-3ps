import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { OrderItem } from 'src/app/models/modules/vendors/vendors.model';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { OrderItemFormComponent } from '../order-item-form/order-item-form.component';
// import { SelectProductComponent } from 'src/app/components/select-windows/orders-windows/select-product/select-product.component';


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
  // @ViewChild('selectProductComponentReference', { read: SelectProductComponent, static: false }) selectProduct!: SelectProductComponent;

  orderItemData: any;
  
  selectedProductId: any;
  selectedProductData: any;

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

    if(this.orderItemForm.orderItemForm.valid && this.selectedProductId){
      let data: OrderItem = {
        created_at: this.orderItemData.data().created_at,
        updated_at: serverTimestamp(),
        item_number: this.orderItemForm.orderItemForm.controls.itemNumber.value as number,
        order: sessionStorage.getItem('orders_order_id') as string,
        quantity: this.orderItemForm.orderItemForm.controls.quantity.value as number,
        product: {
          id: this.selectedProductId,
          data: {
            product_code: this.selectedProductData.product_code,
            product_name: this.selectedProductData.product_name,
            price: this.selectedProductData.price,
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
    this.orderItemForm.orderItemForm.controls.productCode.setValue(this.formatId.formatId(data.data().product?.data.product_code, 4, "#", "PR"));
    this.orderItemForm.orderItemForm.controls.productName.setValue(data.data().product?.data.product_name);
    this.orderItemForm.orderItemForm.controls.price.setValue(data.data().product.data.price);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(data.data().quantity);

    this.selectedProductId = data.data().product.id;
    this.selectedProductData = data.data().product.data;
  }
  
  openProductWindow(){
    // // console.log("You are opening select product window")
    // this.selectProduct.openModal();
  }

  onProductSelected(productData: any){
    // console.log(productData);

    // this.orderItemForm.orderItemForm.controls.productCode.setValue(this.formatId.formatId(productData.data().product_code, 4, "#", "PR"));
    // this.orderItemForm.orderItemForm.controls.productName.setValue(productData.data().product_name);
    // this.orderItemForm.orderItemForm.controls.price.setValue(productData.data().price);

    this.selectedProductId = productData.id;
    this.selectedProductData = productData.data();
  }

}
