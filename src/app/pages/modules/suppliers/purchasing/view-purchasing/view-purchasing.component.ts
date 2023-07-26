import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { serverTimestamp } from 'firebase/firestore';

// import { Purchasing } from 'src/app/models/modules/inventory/inventory.model';
// import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
// import { InventoryPrintService } from 'src/app/services/modules-print/inventory-print/inventory-print.service';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

// import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
// import { SelectSupplierComponent } from 'src/app/components/select-windows/inventory-windows/select-supplier/select-supplier.component';


@Component({
  selector: 'app-view-purchasing',
  templateUrl: './view-purchasing.component.html',
  styleUrls: ['./view-purchasing.component.scss']
})
export class ViewPurchasingComponent {

  constructor(
    private router: Router,
    // private inventoryApi: InventoryApiService,
    // private inventoryPrint: InventoryPrintService,
    // private formatId: FormatIdService
  ) {}

  // @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  // @ViewChild('selectSupplierComponentReference', { read: SelectSupplierComponent, static: false }) selectSupplier!: SelectSupplierComponent;

  purchasingData: any;

  selectedSupplierId: any;
  selectedSupplierData: any;
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  selectedUserData: any = JSON.parse(String(localStorage.getItem("selected_user_role")));
  
  isFetchingData = false;
  isSavingPurchasing = false;
  isDeletingPurchasing = false;
  isSaved = false;

  purchasingForm = new FormGroup({
    purchasingCode: new FormControl(''),
    purchasingDate: new FormControl(),
    supplierCode: new FormControl({value: '', disabled: true}),
    supplierName: new FormControl({value: '', disabled: true}, Validators.required),
    receivedBy: new FormControl({value: '', disabled: true}),
    purchasingStatus: new FormControl(''),
    dateReceived: new FormControl(),
    comments: new FormControl(''),
  })

  ngOnInit(): void {
    this.getPurchasing();
  }

  getPurchasing() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('inventory_purchasing_id') as string;

    // this.inventoryApi.getPurchasing(id)
    //   .then((res) => {
    //     // console.log(res);
    //     this.purchasingData = res;
    //     this.isFetchingData = false;
    //     this.setPurchasingData();        
    //   }),
    //   (err: any) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.isFetchingData = false;
    //   };
  }

  updatePurchasing() {
    this.isSaved = true;
    
    if(this.purchasingForm.valid && this.selectedSupplierId){
      this.isSavingPurchasing = true;

      const id = sessionStorage.getItem('inventory_purchasing_id') as string;
      let data = this.setUpdatePurchasingData();
      
      // this.inventoryApi.updatePurchasing(id, data)
      //   .then((res) => {
      //     // console.log(res);
      //     this.isSavingPurchasing = false;
      //   })
      //   .catch((err) => {
      //     // console.log(err);
      //     this.connectionToast.openToast();
      //     this.isSavingPurchasing = false;
      //   });
    }
  }

  deletePurchasing() {
    this.isDeletingPurchasing = true;

    const id = sessionStorage.getItem('inventory_purchasing_id') as string;

    // this.inventoryApi.deletePurchasing(id)
    //   .then((res) => {
    //     // console.log(res);
    //     this.router.navigateByUrl('modules/inventory/purchasing/all-purchasing')
    //     this.isDeletingPurchasing = false;
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.isDeletingPurchasing = false;
    //   });
  }

  setPurchasingData(){
    // this.purchasingForm.controls.purchasingCode.setValue(this.formatId.formatId(this.purchasingData.data().purchasing_code, 5, "#", "PC"));
    this.purchasingForm.controls.purchasingDate.setValue(this.purchasingData.data().purchasing_date);
    // this.purchasingForm.controls.supplierCode.setValue(this.formatId.formatId(this.purchasingData.data().supplier.data.supplier_code, 4, "#", "SU"));
    this.purchasingForm.controls.supplierName.setValue(this.purchasingData.data().supplier.data.supplier_name);
    this.purchasingForm.controls.purchasingStatus.setValue(this.purchasingData.data().purchasing_status);
    this.purchasingForm.controls.dateReceived.setValue(this.purchasingData.data().date_received);
    this.purchasingForm.controls.receivedBy.setValue(this.purchasingData.data().received_by?.data?.full_name);
    this.purchasingForm.controls.comments.setValue(this.purchasingData.data().comments);

    this.selectedSupplierId = this.purchasingData.data().supplier.id;
    this.selectedSupplierData = this.purchasingData.data().supplier.data;
  }

  setUpdatePurchasingData(){
    // let data: Purchasing = {
    //   created_at: this.purchasingData.data().created_at,
    //   updated_at: serverTimestamp(),
    //   purchasing_code: this.purchasingData.data().purchasing_code,
    //   purchasing_date: this.purchasingForm.controls.purchasingDate.value,
    //   purchasing_status: this.purchasingForm.controls.purchasingStatus.value as string,
    //   date_received: this.purchasingForm.controls.dateReceived.value,
    //   total_price: 0.00,
    //   comments: this.purchasingForm.controls.dateReceived.value,
    //   received_by: {
    //     id: this.purchasingData.data().received_by.id,
    //     data: {
    //       staff_code: this.purchasingData.data().received_by.data.staff_code as string,
    //       full_name: this.purchasingData.data().received_by.data.full_name as string,
    //       staff_role: this.purchasingData.data().received_by.data.staff_role as string,
    //     }
    //   },
    //   supplier: {
    //     id: this.selectedSupplierId,
    //     data: {
    //       supplier_code: this.selectedSupplierData.supplier_code,
    //       supplier_name: this.selectedSupplierData.supplier_name
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

  openSupplierWindow(){
    // // console.log("You are opening select supplier window")
    // this.selectSupplier.openModal();
  }

  onSupplierSelected(supplierData: any){
    // console.log(supplierData);
    this.selectedSupplierId = supplierData.id;
    this.selectedSupplierData = supplierData.data();
    this.purchasingForm.controls.supplierCode.setValue(supplierData.data().supplier_code);
    this.purchasingForm.controls.supplierName.setValue(supplierData.data().supplier_name);
  }

  onPrint(){
    // console.log("lets print!.......");
    // this.inventoryPrint.printPurchasing();
  }

}
