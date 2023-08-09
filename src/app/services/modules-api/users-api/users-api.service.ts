import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  thirdPartyRoleRef = this.firestore.collection('users_third_party_role');

  // user role

  createThirdPartyRole(data: any){
    return this.thirdPartyRoleRef.add(data);
  }

  updateThirdPartyRole(id:any, data: any){
    return this.thirdPartyRoleRef.doc(id).update(data);
  }

  deleteThirdPartyRole(id: any){
    return this.thirdPartyRoleRef.doc(id).delete();
  }

  setThirdPartyRole(id:any, data: any){
    return this.thirdPartyRoleRef.doc(id).set(data);
  }

  getThirdPartyRole(id: any){
    return this.thirdPartyRoleRef.doc(id).ref.get();
  }

  getThirdPartyRoleList(){
    return this.thirdPartyRoleRef.ref
      .orderBy("created_at", "desc")
      .get();
  }

  getCompanyThirdPartyRoleList(){
    return this.thirdPartyRoleRef.ref
      // .where("company.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

}
