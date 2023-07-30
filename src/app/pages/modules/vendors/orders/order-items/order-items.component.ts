import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { VendorsApiService } from 'src/app/services/modules-api/vendors-api/vendors-api.service';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';

import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddOrderItemComponent } from '../add-order-item/add-order-item.component';
import { EditOrderItemComponent } from '../edit-order-item/edit-order-item.component';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss']
})
export class OrderItemsComponent {

  constructor(
    private router: Router,
    private vendorsApi: VendorsApiService,
  ) { }

  @Output() setOrderTotal = new EventEmitter<any>();

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addOrderItemComponentReference', { read: AddOrderItemComponent, static: false }) addOrderItem!: AddOrderItemComponent;
  @ViewChild('editOrderItemComponentReference', { read: EditOrderItemComponent, static: false }) editOrderItem!: EditOrderItemComponent;
  
  orderItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  totalPrice: number = 0.00;
  lastItem = 0;

  ngOnInit(): void {
    this.getOrderItemList();
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    for (let item of this.orderItemListData){
      this.totalPrice += item.data().product.data.price * item.data().quantity;
    }

    this.patchTotalAmount();
    this.setOrderTotal.emit(this.totalPrice);
    // console.log(this.totalPrice);
  }

  getOrderItemList(){
    this.isFetchingData = true;

    this.vendorsApi.getOrderItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderItemListData = res.docs;

          this.calculateTotalPrice();

          try { this.lastItem = res.docs.length }
          catch{ this.lastItem = 0 }

          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createOrderItem(data: any) {
    // console.log(data);

    this.addOrderItem.isItemSaving = true;

    this.vendorsApi.createOrderItem(data)
      .then((res: any) => {
        // console.log(res);

        if(res.id){
          this.getOrderItemList();

          this.addOrderItem.isItemSaving = false;
          this.addOrderItem.dismissButton.nativeElement.click();
          this.addOrderItem.resetForm();
        }
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.addOrderItem.isItemSaving = false;
      });
  }

  updateOrderItem(order_item: any) {
    this.editOrderItem.isItemSaving = true;
    
    this.vendorsApi.updateOrderItem(order_item.id, order_item.data)
      .then((res) => {
        // console.log(res);
        this.editOrderItem.isItemSaving = false;
        this.editOrderItem.dismissButton.nativeElement.click();
        this.getOrderItemList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.editOrderItem.isItemSaving = false;
      });
  }

  deleteOrderItem() {
    this.isItemDeleting = true;

    this.vendorsApi.deleteOrderItem(this.deleteId)
      .then((res) => {
        // console.log(res);
        this.isItemDeleting = false;
        this.getOrderItemList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  patchTotalAmount(){
    const id = sessionStorage.getItem('orders_order_id') as string;
    let data = { total_price: this.totalPrice }

    this.vendorsApi.updateOrder(id, data)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
      });
  }

  openEditItem(data: any){
    // console.log(data);
    this.editOrderItem.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
