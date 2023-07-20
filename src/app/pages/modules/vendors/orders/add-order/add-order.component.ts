import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { serverTimestamp } from 'firebase/firestore';

// import { Order } from 'src/app/models/modules/orders/orders.model';
// import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

// import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { SelectVendorComponent } from 'src/app/components/select-windows/orders-windows/select-vendor/select-vendor.component';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {  

  constructor(
    private router: Router,
    // private ordersApi: OrdersApiService,
    // private formatId: FormatIdService,
  ) {}

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;  
  // @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectVendorComponentReference', { read: SelectVendorComponent, static: false }) selectVendor!: SelectVendorComponent;

  isFetchingData = false;
  isSavingOrder = false;
  isSaved = false;

  thisId = 0;

  selectedVendorId: any;
  selectedVendorData: any;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  orderForm = new FormGroup({
    orderCode: new FormControl({value: '', disabled: true}),
    orderDate: new FormControl(),
    vendorCode: new FormControl({value: '', disabled: true}),
    vendorName: new FormControl({value: '', disabled: true}, Validators.required),
  })

  openModal(){
    this.orderForm.controls.orderDate.setValue(new Date().toISOString().slice(0, 16));
    this.newButton.nativeElement.click();
    this.getLastOrder();
  }

  getLastOrder(){
    this.isFetchingData = true;

    // this.ordersApi.getLastOrder()
    //   .then(
    //     (res: any) => {
    //       // console.log(res);
    //       if(res.docs[0])
    //         this.thisId = res.docs[0]?.data()?.order_code + 1;        
    //       else  
    //         this.thisId = this.thisId + 1;
    //       this.orderForm.controls.orderCode.setValue(this.formatId.formatId(this.thisId, 5, "#", "RD"));
    //       this.isFetchingData = false;
    //     },
    //     (err: any) => {
    //       // console.log(err);
    //       this.connectionToast.openToast();
    //       this.isFetchingData = false;
    //     }
    //   )
  }
  
  createOrder() {
    this.isSaved = true;
    
    if(this.orderForm.valid && this.selectedVendorId){
      this.isSavingOrder = true;

      let data = this.setCreateOrderData();
      
      // this.ordersApi.createOrder(data)
      //   .then((res: any) => {
      //     // console.log(res);

      //     if(res.id){
      //       sessionStorage.setItem('orders_order_id', res.id);
      //       this.router.navigateByUrl("/modules/orders/orders/view-order");
      //     }

      //     this.dismissButton.nativeElement.click();
      //     this.isSavingOrder = false;
      //   })
      //   .catch((err: any) => {
      //     // console.log(err);
      //     this.connectionToast.openToast();
      //     this.isSavingOrder = false;
      //   });
    }
  }

  setCreateOrderData(){
    // let data: Order = {
    //   created_at: serverTimestamp(),
    //   updated_at: serverTimestamp(),
    //   order_code: this.thisId,
    //   order_date: this.orderForm.controls.orderDate.value,
    //   order_status: "Processing",
    //   delivery_date: null,
    //   total_price: 0.00,
    //   vendor: {
    //     id: this.selectedVendorId,
    //     data: {
    //       vendor_code: this.selectedVendorData.vendor_code,
    //       vendor_name: this.selectedVendorData.vendor_name
    //     }
    //   },
    //   branch: {
    //     id: this.selectedBranchData.id,
    //     data: {
    //       branch_name: this.selectedBranchData.data.branch_name,
    //       location: this.selectedBranchData.data.location
    //     }
    //   },
    // }

    // // console.log(data);
    // return data;
  }

  openVendorWindow(){
    // // console.log("You are opening select vendor window")
    // this.selectVendor.openModal();
  }

  onVendorSelected(vendorData: any){
    // console.log(vendorData);
    this.selectedVendorId = vendorData.id;
    this.selectedVendorData = vendorData.data();
    // this.orderForm.controls.vendorCode.setValue(this.formatId.formatId(vendorData.data().vendor_code, 4, "#", "VE"));
    this.orderForm.controls.vendorName.setValue(vendorData.data().vendor_name);
  }

}
