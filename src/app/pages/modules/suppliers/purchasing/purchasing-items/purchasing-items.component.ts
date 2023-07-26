import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
// import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddPurchasingItemComponent } from '../add-purchasing-item/add-purchasing-item.component';
import { EditPurchasingItemComponent } from '../edit-purchasing-item/edit-purchasing-item.component';


@Component({
  selector: 'app-purchasing-items',
  templateUrl: './purchasing-items.component.html',
  styleUrls: ['./purchasing-items.component.scss']
})
export class PurchasingItemsComponent {
  
  constructor(
    private router: Router,
    // private inventoryApi: InventoryApiService,
    // private formatId: FormatIdService
  ) { }

  // @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addPurchasingItemComponentReference', { read: AddPurchasingItemComponent, static: false }) addPurchasingItem!: AddPurchasingItemComponent;
  @ViewChild('editPurchasingItemComponentReference', { read: EditPurchasingItemComponent, static: false }) editPurchasingItem!: EditPurchasingItemComponent;
  
  purchasingItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  totalPrice: number = 0.00;
  lastItem = 0;

  ngOnInit(): void {
    this.getPurchasingItemList();
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    for (let item of this.purchasingItemListData){
      this.totalPrice += item.data().stock_item.data.unit_price * item.data().quantity;
    }

    this.patchTotalAmount();
    // console.log(this.totalPrice);
  }

  getPurchasingItemList(){
    this.isFetchingData = true;

    // this.inventoryApi.getPurchasingItemList()
    //   .then(
    //     (res: any) => {
    //       // console.log(res);
    //       this.purchasingItemListData = res.docs;

    //       this.calculateTotalPrice();

    //       try { this.lastItem = res.docs.length }
    //       catch{ this.lastItem = 0 }

    //       this.isFetchingData = false;
    //     },
    //     (err: any) => {
    //       // console.log(err);
    //       this.connectionToast.openToast();
    //       this.isFetchingData = false;
    //     }
    //   )
  }

  createPurchasingItem(data: any) {
    this.addPurchasingItem.isItemSaving = true;

    // console.log(data);

    // this.inventoryApi.createPurchasingItem(data)
    //   .then((res: any) => {
    //     // console.log(res);

    //     if(res.id){
    //       this.getPurchasingItemList();

    //       this.addPurchasingItem.isItemSaving = false;
    //       this.addPurchasingItem.dismissButton.nativeElement.click();
    //       this.addPurchasingItem.resetForm();
    //     }
    //   })
    //   .catch((err: any) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.addPurchasingItem.isItemSaving = false;
    //   });
  }

  updatePurchasingItem(purchasing_item: any) {
    this.editPurchasingItem.isItemSaving = true;
    
    // this.inventoryApi.updatePurchasingItem(purchasing_item.id, purchasing_item.data)
    //   .then((res) => {
    //     // console.log(res);
    //     this.editPurchasingItem.isItemSaving = false;
    //     this.editPurchasingItem.dismissButton.nativeElement.click();
    //     this.getPurchasingItemList();
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.editPurchasingItem.isItemSaving = false;
    //   });
  }

  deletePurchasingItem() {
    this.isItemDeleting = true;

    // this.inventoryApi.deletePurchasing(this.deleteId)
    //   .then((res) => {
    //     // console.log(res);
    //     this.isItemDeleting = false;
    //     this.getPurchasingItemList();
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //     this.isItemDeleting = false;
    //   });
  }

  patchTotalAmount(){
    const id = sessionStorage.getItem('inventory_purchasing_id') as string;
    let data = { total_price: this.totalPrice }

    // this.inventoryApi.updatePurchasing(id, data)
    //   .then((res) => {
    //     // console.log(res);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //   });
  }

  gotoChecks(itemId: any){
    sessionStorage.setItem('inventory_purchasing_item_id', itemId);
    this.router.navigateByUrl('/modules/inventory/purchasing/quality-checks');
  }

  openEditItem(data: any){
    // console.log(data);
    this.editPurchasingItem.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }
  
}
