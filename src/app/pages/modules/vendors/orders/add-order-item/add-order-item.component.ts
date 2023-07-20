import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
// import { serverTimestamp } from 'firebase/firestore';

// import { OrderItem } from 'src/app/models/modules/orders/orders.model';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

// import { OrderItemFormComponent } from '../order-item-form/order-item-form.component';
// import { SelectProductComponent } from 'src/app/components/select-windows/orders-windows/select-product/select-product.component';


@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.scss']
})
export class AddOrderItemComponent {

  constructor(
    // private formatId: FormatIdService,
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  // @ViewChild('orderItemFormComponentReference', { read: OrderItemFormComponent, static: false }) orderItemForm!: OrderItemFormComponent;
  // @ViewChild('selectProductComponentReference', { read: SelectProductComponent, static: false }) selectProduct!: SelectProductComponent;

  isItemSaving = false;

  selectedProductId: any;
  selectedProductData: any;

  openModal(lastId: any){
    // this.orderItemForm.orderItemForm.controls.itemNumber.setValue(lastId + 1);
    // this.orderItemForm.orderItemForm.controls.price.setValue(0.00);
    // this.orderItemForm.orderItemForm.controls.quantity.setValue(1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    // this.orderItemForm.isSaved = true;    

    // if(this.orderItemForm.orderItemForm.valid && this.selectedProductId){
    //   let data: OrderItem = {
    //     created_at: serverTimestamp(),
    //     updated_at: serverTimestamp(),
    //     item_number: this.orderItemForm.orderItemForm.controls.itemNumber.value as number,
    //     order: sessionStorage.getItem('orders_order_id') as string,
    //     quantity: this.orderItemForm.orderItemForm.controls.quantity.value as number,
    //     product: {
    //       id: this.selectedProductId,
    //       data: {
    //         product_code: this.selectedProductData.product_code,
    //         product_name: this.selectedProductData.product_name,
    //         price: this.selectedProductData.price,
    //       }
    //     },
    //   }
      
    //   this.saveItemEvent.emit(data);
    // }
  }

  resetForm(){
    // this.orderItemForm.orderItemForm.controls.itemNumber.setValue(null);
    // this.orderItemForm.orderItemForm.controls.productCode.setValue('');
    // this.orderItemForm.orderItemForm.controls.productName.setValue('');
    // this.orderItemForm.orderItemForm.controls.price.setValue(0.00);
    // this.orderItemForm.orderItemForm.controls.quantity.setValue(1);
    // this.selectedProductId = null;
    // this.selectedProductData = null;
  }

  openProductWindow(){
    // // console.log("You are opening select product window")
    // this.selectProduct.openModal();
  }

  onProductSelected(productData: any){
    // console.log(productData);

    this.selectedProductData = productData;
    // this.orderItemForm.orderItemForm.controls.productCode.setValue(this.formatId.formatId(productData.data().product_code, 4, "#", "PR"));
    // this.orderItemForm.orderItemForm.controls.productName.setValue(productData.data().product_name);
    // this.orderItemForm.orderItemForm.controls.price.setValue(productData.data().price);

    this.selectedProductId = productData.id;
    this.selectedProductData = productData.data();
  }
  
}
