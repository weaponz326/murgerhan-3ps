import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { FactoryOrder } from 'src/app/models/modules/vendors/vendors.model';
import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
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
    private factoryApi: FactoryApiService,
    private vendorsPrint: VendorsPrintService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('submitButtonElementReference', { read: ElementRef, static: false }) submitButtonElement!: ElementRef;
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
  isSubmitting = false;
  isSaved = false;

  minDate: any;

  orderForm = new FormGroup({
    orderCode: new FormControl({value: '', disabled: true}),
    orderDate: new FormControl({value: '', disabled: true}),
    orderStatus: new FormControl(''),
    deliveryDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getVendorOrder();
  }

  getMinDate(orderDate: any){
    const minDate = new Date(orderDate);
    minDate.setDate(minDate.getDate() + 1);
    this.minDate = minDate.toISOString().split('T')[0];
    // console.log(this.minDate);
  }

  getVendorOrder() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('vendors_order_id') as string;

    this.factoryApi.getVendorOrder(id)
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

  updateVendorOrder() {       
    this.isSaved = true;
     
    if(this.orderForm.valid && this.selectedBranchId){
      this.isSavingOrder = true;

      const id = sessionStorage.getItem('vendors_order_id') as string;
      let data = this.setUpdateVendorOrderData();

      this.factoryApi.updateVendorOrder(id, data)
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

  deleteVendorOrder() {
    this.isDeletingOrder = true;

    const id = sessionStorage.getItem('vendors_order_id') as string;

    this.factoryApi.deleteVendorOrder(id)
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

  submitOrder(){
    this.isSubmitting = true;

    const id = sessionStorage.getItem('vendors_order_id') as string;
    let data = { sbmitted: true };

    this.factoryApi.updateVendorOrder(id, data)
      .then((res) => {
        // console.log(res);
        this.isSubmitting = false;
        this.getVendorOrder();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isSubmitting = false;
      });
  }

  setOrderData(){
    this.orderForm.controls.orderCode.setValue(this.formatId.formatId(this.orderData.data().order_code, 5, "#", "RD"));
    this.orderForm.controls.orderDate.setValue(this.orderData.data().order_date);
    this.orderForm.controls.orderStatus.setValue(this.orderData.data().order_status);
    this.orderForm.controls.deliveryDate.setValue(this.orderData.data().delivery_date);

    this.orderTotal = this.orderData.data().total_price;

    // this.selectedBranchId = this.orderData.data().branch.id;
    // this.selectedBranchData = this.orderData.data().branch.data;
  }

  setUpdateVendorOrderData(){
    let data: FactoryOrder = {
      created_at: this.orderData.data().created_at,
      updated_at: serverTimestamp(),
      order_code: this.orderData.data().order_code,
      order_date: this.orderForm.controls.orderDate.value,
      order_status: this.orderForm.controls.orderStatus.value as string,
      delivery_date: this.orderForm.controls.deliveryDate.value,
      submitted: this.orderData.data().submitted,
      order_total: this.orderTotal,
      vendor: {
        id: this.selectedVendorData.id,
        data: {
          vendor_code: this.selectedVendorData.data.company_code,
          vendor_name: this.selectedVendorData.data.company_name
        }
      },
    }

    // console.log(data);
    return data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  openSubmitConfirmModal(){
    this.submitButtonElement.nativeElement.click();
  }

  confirmSubmit(){
    this.submitOrder();
  }

  // openBranchWindow(){
  //   // console.log("You are opening select branch window")
  //   this.selectBranch.openModal();
  // }

  // onBranchSelected(data: any){
  //   // console.log(data);

  //   this.orderForm.controls.branchName.setValue(data.data().branch_name);
  //   this.selectedBranchId = data.id;
  //   this.selectedBranchData = data.data();
  // }

  onPrint(){
    // console.log("lets print!.......");
    this.vendorsPrint.getInvoice();
  }
  
}
