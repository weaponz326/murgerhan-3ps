import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { serverTimestamp } from 'firebase/firestore';

// import { Order } from 'src/app/models/modules/orders/orders.model';
// import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
// import { OrdersPrintService } from 'src/app/services/modules-print/orders-print/orders-print.service';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

// import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
// import { SelectVendorComponent } from 'src/app/components/select-windows/orders-windows/select-vendor/select-vendor.component';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {

  constructor(
    private router: Router,
    // private ordersApi: OrdersApiService,
    // private ordersPrint: OrdersPrintService,
    // private formatId: FormatIdService,
  ) {}

  // @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  // @ViewChild('selectVendorComponentReference', { read: SelectVendorComponent, static: false }) selectVendor!: SelectVendorComponent;

  orderData: any;
  orderTotal = 0.00;

  selectedVendorId: any;
  selectedVendorData: any;
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingOrder = false;
  isDeletingOrder = false;
  isSaved = false;

  orderForm = new FormGroup({
    orderCode: new FormControl({value: '', disabled: true}),
    orderDate: new FormControl(),
    vendorCode: new FormControl({value: '', disabled: true}),
    vendorName: new FormControl({value: '', disabled: true}, Validators.required),
    orderStatus: new FormControl(''),
    deliveryDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('orders_order_id') as string;

    // this.ordersApi.getOrder(id)
    //   .then((res) => {
    //     console.log(res.data());
    //     this.orderData = res;
    //     this.isFetchingData = false;
    //     this.setOrderData();        
    //   }),
    //   (err: any) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.isFetchingData = false;
    //   };
  }

  updateOrder() {       
    this.isSaved = true;
     
    if(this.orderForm.valid && this.selectedVendorId){
      this.isSavingOrder = true;

      const id = sessionStorage.getItem('orders_order_id') as string;
      let data = this.setUpdateOrderData();

      // this.ordersApi.updateOrder(id, data)
      //   .then((res) => {
      //     // console.log(res);
      //     this.isSavingOrder = false;
      //   })
      //   .catch((err) => {
      //     // console.log(err);
      //     this.connectionToast.openToast();
      //     this.isSavingOrder = false;
      //   });
    }
  }

  deleteOrder() {
    this.isDeletingOrder = true;

    const id = sessionStorage.getItem('orders_order_id') as string;

    // this.ordersApi.deleteOrder(id)
    //   .then((res) => {
    //     // console.log(res);
    //     this.router.navigateByUrl('modules/orders/orderes/all-orders')
    //     this.isDeletingOrder = false;
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.isDeletingOrder = false;
    //   });
  }

  setOrderData(){
    // this.orderForm.controls.orderCode.setValue(this.formatId.formatId(this.orderData.data().order_code, 5, "#", "RD"));
    this.orderForm.controls.orderDate.setValue(this.orderData.data().order_date);
    // this.orderForm.controls.vendorCode.setValue(this.formatId.formatId(this.orderData.data().vendor.data.vendor_code, 4, "#", "VE"));
    this.orderForm.controls.vendorName.setValue(this.orderData.data().vendor.data.vendor_name);
    this.orderForm.controls.orderStatus.setValue(this.orderData.data().order_status);
    this.orderForm.controls.deliveryDate.setValue(this.orderData.data().delivery_date);

    this.orderTotal = this.orderData.data().total_price;

    this.selectedVendorId = this.orderData.data().vendor.id;
    this.selectedVendorData = this.orderData.data().vendor.data;
  }

  setUpdateOrderData(){
    // let data: Order = {
    //   created_at: this.orderData.data().created_at,
    //   updated_at: serverTimestamp(),
    //   order_code: this.orderData.data().order_code,
    //   order_date: this.orderForm.controls.orderDate.value,
    //   order_status: this.orderForm.controls.orderStatus.value as string,
    //   delivery_date: this.orderForm.controls.deliveryDate.value,
    //   total_price: 0.00,
    //   vendor: {
    //     id: this.selectedVendorData.id,
    //     data: {
    //       vendor_code: this.selectedVendorData.data.vendor_code,
    //       vendor_name: this.selectedVendorData.data.vendor_name
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

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  openVendorWindow(){
    // // console.log("You are opening select vendor window")
    // this.selectVendor.openModal();
  }

  onVendorSelected(vendorData: any){
    // console.log(vendorData);
    this.selectedVendorId = vendorData.id;
    this.selectedVendorData = vendorData.data();
    this.orderForm.controls.vendorCode.setValue(vendorData.data().vendor_code);
    this.orderForm.controls.vendorName.setValue(vendorData.data().vendor_name);
  }

  onPrint(){
    // console.log("lets print!.......");
    // this.ordersPrint.printOrder();
  }
  
}
