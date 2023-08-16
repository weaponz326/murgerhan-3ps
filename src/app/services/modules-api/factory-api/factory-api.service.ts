import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FactoryApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  factoryItemRef = this.firestore.collection('factory_factory_item');
  factoryVendorOrderRef = this.firestore.collection('factory_vendor_order');
  factoryVendorOrderItemRef = this.firestore.collection('factory_vendor_order_item');

  // factory item

  createFactoryItem(data: any){
    return this.factoryItemRef.add(data);
  }

  updateFactoryItem(id:any, data: any){
    return this.factoryItemRef.doc(id).update(data);
  }

  deleteFactoryItem(id: any){
    return this.factoryItemRef.doc(id).delete();
  }

  getFactoryItem(id: any){
    return this.factoryItemRef.doc(id).ref.get();
  }

  getLastFactoryItem(){
    return this.factoryItemRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
  }

  getFactoryItemList(){
    return this.factoryItemRef.ref
      .orderBy("created_at", "desc")
      .get();
  }

  // vendor order

  createVendorOrder(data: any){
    return this.factoryVendorOrderRef.add(data);
  }

  updateVendorOrder(id:any, data: any){
    return this.factoryVendorOrderRef.doc(id).update(data);
  }

  deleteVendorOrder(id: any){
    return this.factoryVendorOrderRef.doc(id).delete();
  }

  getVendorOrder(id: any){
    return this.factoryVendorOrderRef.doc(id).ref.get();
  }

  getLastVendorOrder(){
    return this.factoryVendorOrderRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
  }

  getVendorOrderList(){
    return this.factoryVendorOrderRef.ref
      .where("vendor.id", "==", JSON.parse(String(localStorage.getItem("selected_company"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  // vendor order items

  createVendorOrderItem(data: any){
    return this.factoryVendorOrderItemRef.add(data);
  }

  updateVendorOrderItem(id:any, data: any){
    return this.factoryVendorOrderItemRef.doc(id).update(data);
  }

  deleteVendorOrderItem(id: any){
    return this.factoryVendorOrderItemRef.doc(id).delete();
  }

  getVendorOrderItem(id: any){
    return this.factoryVendorOrderItemRef.doc(id).ref.get();
  }

  getVendorOrderItemList(){
    return this.factoryVendorOrderItemRef.ref
      .where("order", "==", sessionStorage.getItem('vendors_order_id'))
      .orderBy("created_at", "asc")
      .get();
  }

}
