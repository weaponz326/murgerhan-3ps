import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { VendorsApiService } from 'src/app/services/modules-api/vendors-api/vendors-api.service';
import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
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
    private factoryApi: FactoryApiService,
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
  totalVat: number = 0.00;
  lastItem = 0;

  ngOnInit(): void {
    this.getVendorOrderItemList();
  }

  calculateOrderTotal(){
    this.calculateTotalPrice();
    this.calculateTotalVat();

    var orderTotal = this.totalPrice + this.totalVat
    this.patchTotalAmount(orderTotal);
    this.setOrderTotal.emit(orderTotal);
    // console.log(orderTotal);
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    for (let item of this.orderItemListData){
      this.totalPrice += item.data().factory_item.data.price * item.data().quantity;
    }

    // console.log(this.totalPrice);
  }

  calculateTotalVat(){
    this.totalVat = 0;
    for (let item of this.orderItemListData){
      this.totalVat += (item.data().factory_item.data.price * item.data().quantity) * (item.data().factory_item.data.vat / 100);
    }

    // console.log(this.totalVat);
  }

  getVendorOrderItemList(){
    this.isFetchingData = true;

    this.factoryApi.getVendorOrderItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderItemListData = res.docs;

          this.calculateOrderTotal();

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

  createVendorOrderItem(data: any) {
    // console.log(data);

    this.addOrderItem.isItemSaving = true;

    this.factoryApi.createVendorOrderItem(data)
      .then((res: any) => {
        // console.log(res);

        if(res.id){
          this.getVendorOrderItemList();

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

  updateVendorOrderItem(order_item: any) {
    this.editOrderItem.isItemSaving = true;
    
    this.factoryApi.updateVendorOrderItem(order_item.id, order_item.data)
      .then((res) => {
        // console.log(res);
        this.editOrderItem.isItemSaving = false;
        this.editOrderItem.dismissButton.nativeElement.click();
        this.getVendorOrderItemList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.editOrderItem.isItemSaving = false;
      });
  }

  deleteVendorOrderItem() {
    this.isItemDeleting = true;

    this.factoryApi.deleteVendorOrderItem(this.deleteId)
      .then((res) => {
        // console.log(res);
        this.isItemDeleting = false;
        this.getVendorOrderItemList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  patchTotalAmount(orderTotal: number){
    const id = sessionStorage.getItem('vendors_order_id') as string;
    let data = { order_total: orderTotal }

    this.factoryApi.updateVendorOrder(id, data)
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
