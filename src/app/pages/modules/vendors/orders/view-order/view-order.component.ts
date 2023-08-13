import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Order } from 'src/app/models/modules/vendors/vendors.model';
import { VendorsApiService } from 'src/app/services/modules-api/vendors-api/vendors-api.service';
import { VendorsPrintService } from 'src/app/services/modules-print/vendors-print/vendors-print.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { SelectBranchComponent } from 'src/app/components/select-windows/select-branch/select-branch.component';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {

  constructor(
    private router: Router,
    private vendorsApi: VendorsApiService,
    private vendorsPrint: VendorsPrintService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('selectBranchComponentReference', { read: SelectBranchComponent, static: false }) selectBranch!: SelectBranchComponent;

  orderData: any;
  orderTotal = 0.00;

  selectedVendorData: any = JSON.parse(String(localStorage.getItem("selected_company")));

  selectedBranchId: any;
  selectedBranchData: any;

  isFetchingData = false;
  isSavingOrder = false;
  isDeletingOrder = false;
  isSaved = false;

  minDate: any;

  orderForm = new FormGroup({
    orderCode: new FormControl({value: '', disabled: true}),
    orderDate: new FormControl({value: '', disabled: true}),
    branchCode: new FormControl({value: '', disabled: true}),
    branchName: new FormControl({value: '', disabled: true}, Validators.required),
    orderStatus: new FormControl(''),
    deliveryDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getOrder();
  }

  getMinDate(orderDate: any){
    const minDate = new Date(orderDate);
    minDate.setDate(minDate.getDate() + 1);
    this.minDate = minDate.toISOString().split('T')[0];
    console.log(this.minDate);
  }

  getOrder() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('vendors_order_id') as string;

    this.vendorsApi.getOrder(id)
      .then((res) => {
        // console.log(res.data());
        this.orderData = res;
        this.isFetchingData = false;

        this.setOrderData();
        this.getMinDate(this.orderData.data().order_date)
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateOrder() {       
    this.isSaved = true;
     
    if(this.orderForm.valid && this.selectedBranchId){
      this.isSavingOrder = true;

      const id = sessionStorage.getItem('vendors_order_id') as string;
      let data = this.setUpdateOrderData();

      this.vendorsApi.updateOrder(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingOrder = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingOrder = false;
        });
    }
  }

  deleteOrder() {
    this.isDeletingOrder = true;

    const id = sessionStorage.getItem('vendors_order_id') as string;

    this.vendorsApi.deleteOrder(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/orders/orderes/all-orders')
        this.isDeletingOrder = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingOrder = false;
      });
  }

  setOrderData(){
    this.orderForm.controls.orderCode.setValue(this.formatId.formatId(this.orderData.data().order_code, 5, "#", "RD"));
    this.orderForm.controls.orderDate.setValue(this.orderData.data().order_date);
    this.orderForm.controls.branchName.setValue(this.orderData.data().branch.data.branch_name);
    this.orderForm.controls.orderStatus.setValue(this.orderData.data().order_status);
    this.orderForm.controls.deliveryDate.setValue(this.orderData.data().delivery_date);

    this.orderTotal = this.orderData.data().total_price;

    this.selectedBranchId = this.orderData.data().branch.id;
    this.selectedBranchData = this.orderData.data().branch.data;
  }

  setUpdateOrderData(){
    let data: Order = {
      created_at: this.orderData.data().created_at,
      updated_at: serverTimestamp(),
      order_code: this.orderData.data().order_code,
      order_date: this.orderForm.controls.orderDate.value,
      order_status: this.orderForm.controls.orderStatus.value as string,
      delivery_date: this.orderForm.controls.deliveryDate.value,
      order_total: this.orderTotal,
      vendor: {
        id: this.selectedVendorData.id,
        data: {
          vendor_code: this.selectedVendorData.data.company_code,
          vendor_name: this.selectedVendorData.data.company_name
        }
      },
      branch: {
        id: this.selectedBranchId,
        data: {
          branch_name: this.selectedBranchData.branch_name,
          location: this.selectedBranchData.location
        }
      },
    }

    // console.log(data);
    return data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  openBranchWindow(){
    // console.log("You are opening select branch window")
    this.selectBranch.openModal();
  }

  onBranchSelected(data: any){
    // console.log(data);

    this.orderForm.controls.branchName.setValue(data.data().branch_name);
    this.selectedBranchId = data.id;
    this.selectedBranchData = data.data();
  }

  onPrint(){
    // console.log("lets print!.......");
    this.vendorsPrint.getInvoice();
  }
  
}
