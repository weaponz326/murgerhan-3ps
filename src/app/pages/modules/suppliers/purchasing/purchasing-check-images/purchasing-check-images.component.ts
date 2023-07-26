import { Component, ViewChild } from '@angular/core';
// import { serverTimestamp } from 'firebase/firestore';
// import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

@Component({
  selector: 'app-purchasing-check-images',
  templateUrl: './purchasing-check-images.component.html',
  styleUrls: ['./purchasing-check-images.component.scss']
})
export class PurchasingCheckImagesComponent {

  constructor(
    // private inventoryApi: InventoryApiService
  ) {}

  // @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  selectedFiles: File[] = [];
  purchasingCheckImageListData: any;

  ngOnInit(): void {
    this.getPurchasingCheckImageList();
  }

  onFileSelected(e: any): void {
    this.selectedFiles = Array.from(e.target.files);
    this.uploadPurchasingCheckImage();
  }

  uploadPurchasingCheckImage() {
    const data = {
      // created_at: serverTimestamp(),
      // updated_at: serverTimestamp(),
      purchasing_check: String(sessionStorage.getItem('inventory_purchasing_id')) + String(sessionStorage.getItem('inventory_purchasing_item_id')),
    };

    // this.inventoryApi.uploadPurchasingCheckImage(this.selectedFiles, data)
    //   .then(() => {
    //     // console.log('Images uploaded successfully');
    //     // Reset the selected files array
    //     this.selectedFiles = [];
    //     this.getPurchasingCheckImageList();
    //   })
    //   .catch((error) => {
    //     console.error('Error uploading images', error);
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

}
