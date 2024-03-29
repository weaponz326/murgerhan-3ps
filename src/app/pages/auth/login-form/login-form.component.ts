import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private usersApi: UsersApiService,
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  errorCode = "";
  errorMessage = "";
  passwordMismatch = false;

  saved: boolean = false;
  isSending: boolean = false;

  roleData: any;

  onSubmit(){
    this.saved = true;

    let email = this.loginForm.controls.email.value as string
    let password = this.loginForm.controls.password.value as string

    this.isSending = true;

    this.authApi.login(email, password)
      .then(
        (res: any) => {
          // console.log(res);
          this.isSending = false;      
          localStorage.setItem('uid', res.user.uid);

          this.getThirdPartyRole();
        },
        (err: any) => {
          // console.log(err);
          this.isSending = false;
          this.errorMessage = err.message.replace("Firebase:", "").replace(/\(.*\)/, "").trim().replace(/\.$/, "");
          this.errorCode = err.code;
          // console.log(this.errorCode, this.errorMessage)
        }
      )
  }

  getThirdPartyRole() {
    this.isSending = true;
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getThirdPartyRole(id)
      .then((res) => {
        // console.log(res.data());
        this.roleData = res;
        this.isSending = false;

        try{
          let data = {
            id: this.roleData.id,
            data: {
              user_code: this.roleData.data().user_code,
              full_name: this.roleData.data().full_name,
              company_type: this.roleData.data().company_type,
              company: {
                id: this.roleData.data().company.id,
                data: {
                  company_code: this.roleData.data().company.data.company_code,
                  company_name: this.roleData.data().company.data.company_name,
                  phone: this.roleData.data().company.data.phone,
                  email: this.roleData.data().company.data.email,
                }
              }
            }
          }

          // console.log(data);
          
          localStorage.setItem("selected_third_party_role", JSON.stringify(data));          
          localStorage.setItem("selected_company", JSON.stringify(data.data.company));
        }
        catch{
          // console.log("probably not logged in!");
        }

        if(this.roleData.data().company_type == "Vendor"){
          this.router.navigateByUrl('/home/vendors/orders');
        }
        if(this.roleData.data().company_type == "Supplier"){
          this.router.navigateByUrl('/home/suppliers/purchasing');
        }
      }),
      (err: any) => {
        // console.log(err);
        this.isSending = false;
      };
  }

}
