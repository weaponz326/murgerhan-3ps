import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(public afAuth: AngularFireAuth) { }

  baseUrl = "";

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async sendEmailVerification() {
    var user: any;
    await this.afAuth.currentUser.then((res: any) => user = res);
    const url = `${this.baseUrl}/auth/signup-success?id=${user.uid}&email=${user.email}`;
    return user.sendEmailVerification({url: url});
  }

  sendPasswordResetEmail(email: string){
    const url = `${this.baseUrl}/auth/reset-success?email=${email}`;
    return this.afAuth.sendPasswordResetEmail(email);
  }

  confirmPasswordReset(code: string, password: string){
    return this.afAuth.confirmPasswordReset(code, password);
  }

  logout(){
    return this.afAuth.signOut();
  }

  getAuth(){
    return this.afAuth.authState;
  }

}
