import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private usersApi: UsersApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  name: string = "";
  email: string = "";

  thirdPartyRole: any;
  // basicProfileData: any;

  ngOnInit(): void {
    this.getAuth();
    // this.getUserRole();
  }

  getAuth(){
    this.isAuthLoading = true;

    this.authApi.getAuth()
      .subscribe(
        (res: any) => {
          // console.log(res);
          this.isAuthLoading = false;

          localStorage.setItem('uid', res.uid);
          localStorage.setItem('email', res.email);

          if (res.uid){
            this.isLoggedIn = true;
            this.email = res.email;
            this.getThirdPartyRole();
          }
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isLoggedIn = false;
          this.isAuthLoading = false;
        }
      )
  }

  getThirdPartyRole() {
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getThirdPartyRole(id)
      .then((res) => {
        // console.log(res.data());
        this.thirdPartyRole = res;

        try{
          let data = {
            id: this.thirdPartyRole.id,
            data: {
              user_code: this.thirdPartyRole.data().user_code,
              full_name: this.thirdPartyRole.data().full_name,
              company_type: this.thirdPartyRole.data().company_type,
              company: {
                id: this.thirdPartyRole.data().company.id,
                data: {
                  company_code: this.thirdPartyRole.data().company.data.company_code,
                  company_name: this.thirdPartyRole.data().company.data.company_name,
                  phone: this.thirdPartyRole.data().company.data.phone,
                  email: this.thirdPartyRole.data().company.data.email,
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
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      };
  }

  logout(){
    // e.stopPropagation();
    // console.log("u logging out? ...where u going?");

    this.authApi.logout()
      .then(
        (res: any) => {
          // console.log(res);
          localStorage.clear();
          window.location.href = "/";
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
        }
      )
  }  

}
