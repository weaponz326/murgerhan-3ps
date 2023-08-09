import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class VendorsApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  productRef = this.firestore.collection('orders_product');
  orderRef = this.firestore.collection('orders_order');
  orderItemRef = this.firestore.collection('orders_order_item');

  // product

  createProduct(data: any){
    return this.productRef.add(data);
  }

  updateProduct(id:any, data: any){
    return this.productRef.doc(id).update(data);
  }

  deleteProduct(id: any){
    return this.productRef.doc(id).delete();
  }

  getProduct(id: any){
    return this.productRef.doc(id).ref.get();
  }

  getLastProduct(){
    return this.productRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
  }

  getProductList(){
    return this.productRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }
   
  // order

  createOrder(data: any){
    return this.orderRef.add(data);
  }

  updateOrder(id:any, data: any){
    return this.orderRef.doc(id).update(data);
  }

  deleteOrder(id: any){
    return this.orderRef.doc(id).delete();
  }

  getOrder(id: any){
    return this.orderRef.doc(id).ref.get();
  }

  getLastOrder(){
    return this.orderRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
  }

  getOrderList(){
    return this.orderRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  getVendorOrderList(){
    return this.orderRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .where("vendor.id", "==", sessionStorage.getItem('orders_vendor_id'))
      .orderBy("created_at", "desc")
      .get();
  }

  // order items

  createOrderItem(data: any){
    return this.orderItemRef.add(data);
  }

  updateOrderItem(id:any, data: any){
    return this.orderItemRef.doc(id).update(data);
  }

  deleteOrderItem(id: any){
    return this.orderItemRef.doc(id).delete();
  }

  getOrderItem(id: any){
    return this.orderItemRef.doc(id).ref.get();
  }

  getOrderItemList(){
    return this.orderItemRef.ref
      .where("order", "==", sessionStorage.getItem('vendors_order_id'))
      .orderBy("created_at", "asc")
      .get();
  }

}
