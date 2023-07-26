import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { serverTimestamp } from 'firebase/firestore';

// import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

// import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { PurchasingCheck } from 'src/app/models/modules/inventory/inventory.model';


@Component({
  selector: 'app-purchasing-quality-checks',
  templateUrl: './purchasing-quality-checks.component.html',
  styleUrls: ['./purchasing-quality-checks.component.scss']
})
export class PurchasingQualityChecksComponent {

  constructor(
    // private inventoryApi: InventoryApiService,
    // private formatId: FormatIdService
  ) {}

  // @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  purchasingData: any;
  purchasingItemData: any;
  checklistListData: any;
  purchasingCheckImageListData: any;

  isFetchingData = false;
  isSavingPurchasingCheck = false;

  checkComments = "";

  checks: any[] = []

  purchasingForm = new FormGroup({
    purchasingCode: new FormControl({value: '', disabled: true}),
    purchasingDate: new FormControl({value: null, disabled: true}),
    supplierCode: new FormControl({value: '', disabled: true}),
    supplierName: new FormControl({value: '', disabled: true}),
  })

  ngOnInit(): void {
    this.getPurchasing();
    this.getPurchasingItem();
    this.getPurchasingCheckImageList();
  }

  updateCheckboxValues() {
    this.checks = this.checklistListData.map((_: any, index: any) => !!this.checks[index]);
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

  getPurchasingItem() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('inventory_purchasing_item_id');

    // this.inventoryApi.getPurchasingItem(id)
    //   .then((res) => {
    //     // console.log(res.data());
    //     this.purchasingItemData = res;
    //     sessionStorage.setItem('inventory_category_id', this.purchasingItemData.data().stock_item.data.item_category.id);
        
    //     this.getChecklistList();
    //   }),
    //   (err: any) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.isFetchingData = false;
    //   };
  }

  getChecklistList(){
    this.isFetchingData = true;

    // this.inventoryApi.getCategoryChecklistList()
    //   .then(
    //     (res: any) => {
    //       // console.log(res);
    //       this.checklistListData = res.docs;
    //       this.isFetchingData = false;

    //       this.getPurchasingCheck();
    //     },
    //     (err: any) => {
    //       // console.log(err);
    //       this.connectionToast.openToast();
    //       this.isFetchingData = false;
    //     }
    //   )
  }

  getPurchasingCheck(){
    this.isFetchingData = true;

    const id = String(sessionStorage.getItem('inventory_purchasing_id')) + String(sessionStorage.getItem('inventory_purchasing_item_id'));

    // this.inventoryApi.getPurchasingCheck(id)
    //   .then(
    //     (res: any) => {
    //       // console.log(res);
    //       let checkData: any = res;
    //       this.isFetchingData = false;
          
    //       try{
    //         this.checkComments = checkData?.data().comments;
    //         this.checks = checkData?.data().checks;
    //       }
    //       catch{
    //         // console.log("no data");
    //       }
    //     },
    //     (err: any) => {
    //       // console.log(err);
    //       this.connectionToast.openToast();
    //       this.isFetchingData = false;
    //     }
    //   )
  }

  setPurchasingCheck() {
    this.isSavingPurchasingCheck = true;
    
    const id = String(sessionStorage.getItem('inventory_purchasing_id')) + String(sessionStorage.getItem('inventory_purchasing_item_id'));

    // let data: PurchasingCheck = {
    //   created_at: serverTimestamp(),
    //   updated_at: serverTimestamp(),
    //   comments: this.checkComments,
    //   checks: this.checks
    // }

    // // console.log(data);

    // this.inventoryApi.setPurchasingCheck(id, data)
    //   .then((res) => {
    //     // console.log(res);
    //     this.isSavingPurchasingCheck = false;
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.isSavingPurchasingCheck = false;
    //   });
  }

  getPurchasingCheckImageList(){
    // this.inventoryApi.getPurchasingCheckImageList()
    //   .then(
    //     (res: any) => {
    //       // console.log(res);
    //       this.purchasingCheckImageListData = res.docs;
    //     },
    //     (err: any) => {
    //       // console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  setPurchasingData(){
    // this.purchasingForm.controls.purchasingCode.setValue(this.formatId.formatId(this.purchasingData.data().purchasing_code, 5, "#", "PC"));
    // this.purchasingForm.controls.purchasingDate.setValue(this.purchasingData.data().purchasing_date);
    // this.purchasingForm.controls.supplierCode.setValue(this.formatId.formatId(this.purchasingData.data().supplier.data.supplier_code, 4, "#", "SU"));
    // this.purchasingForm.controls.supplierName.setValue(this.purchasingData.data().supplier.data.supplier_name);
  }

  getFormatId(id: any){
    // return this.formatId.formatId(id, 5, "#", "SI");
  }

}
