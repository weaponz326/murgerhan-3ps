import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Order } from 'src/app/models/modules/vendors/vendors.model';
import { VendorsApiService } from 'src/app/services/modules-api/vendors-api/vendors-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SelectBranchComponent } from 'src/app/components/select-windows/select-branch/select-branch.component';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {  

  constructor(
    private router: Router,
    private vendorsApi: VendorsApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;  
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('selectBranchComponentReference', { read: SelectBranchComponent, static: false }) selectBranch!: SelectBranchComponent;

  isFetchingData = false;
  isSavingOrder = false;
  isSaved = false;

  thisId = 0;
  
  selectedVendorData: any = JSON.parse(String(localStorage.getItem("selected_company")));

  selectedBranchId: any;
  selectedBranchData: any;

  tomorrow: any = '';

  orderForm = new FormGroup({
    orderCode: new FormControl({value: '', disabled: true}),
    orderDate: new FormControl({value: '', disabled: true}),
    branchName: new FormControl({value: '', disabled: true}),
  })

  ngOnInit(): void {
    this.setTomorrowDate();
  }

  openModal(){
    this.orderForm.controls.orderDate.setValue(new Date().toISOString().slice(0, 16));
    this.newButton.nativeElement.click();
    this.getLastOrder();
    this.setTomorrowDate();
  }

  setTomorrowDate(){
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrow = tomorrow.toISOString().split('T')[0];
  }

  getLastOrder(){
    this.isFetchingData = true;

    this.vendorsApi.getLastOrder()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.order_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.orderForm.controls.orderCode.setValue(this.formatId.formatId(this.thisId, 5, "#", "RD"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }
  
  createOrder() {
    this.isSaved = true;
    
    if(this.orderForm.valid){
      this.isSavingOrder = true;

      let data = this.setCreateOrderData();
      
      this.vendorsApi.createOrder(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('vendors_order_id', res.id);
            this.router.navigateByUrl("/home/vendors/orders/view-order");
          }

          this.dismissButton.nativeElement.click();
          this.isSavingOrder = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingOrder = false;
        });
    }
  }

  setCreateOrderData(){
    let data: Order = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      order_code: this.thisId,
      order_date: this.orderForm.controls.orderDate.value,
      order_status: "Processing",
      delivery_date: this.tomorrow,
      order_total: 0.00,
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

}
