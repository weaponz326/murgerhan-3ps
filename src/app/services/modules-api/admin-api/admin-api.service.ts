import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// import {
//   Firestore, addDoc, collection, collectionData,
//   doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
// } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  branchRef = this.firestore.collection('admin_branch');

  // branch

  createBranch(data: any){
    return this.branchRef.add(data);
  }

  updateBranch(id:any, data: any){
    return this.branchRef.doc(id).update(data);
  }

  deleteBranch(id: any){
    return this.branchRef.doc(id).delete();
  }

  getBranch(id: any){
    return this.branchRef.doc(id).ref.get();
  }

  getBranchList(){
    return this.branchRef.ref.get();
  }

}
