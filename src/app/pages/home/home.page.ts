import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  name: string = "";
  email: string = "";

  userRoleData: any;
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

  getUserRole() {
    const id = localStorage.getItem('uid') as string;

    // this.usersApi.getUserRole(id)
    //   .then((res) => {
    //     // console.log(res.data());
    //     this.userRoleData = res;

    //     try{
    //       let data = {
    //         id: this.userRoleData.id,
    //         data: {
    //           staff_code: this.userRoleData.data().staff_code,
    //           full_name: this.userRoleData.data().full_name,
    //           staff_role: this.userRoleData.data().staff_role,
    //           branch: {
    //             id: this.userRoleData.data().branch.id,
    //             data: {
    //               branch_name: this.userRoleData.data().branch.data.branch_name,
    //               location: this.userRoleData.data().branch.data.location,
    //             }
    //           }
    //         }
    //       }

    //       // console.log(data);
          
    //       localStorage.setItem("selected_user_role", JSON.stringify(data));
    //       localStorage.setItem("selected_branch", JSON.stringify(data.data.branch));
    //       localStorage.setItem("user_role", String(data.data.staff_role));
    //       this.branchName = JSON.parse(String(localStorage.getItem("selected_branch"))).data.branch_name;          
    //     }
    //     catch{
    //       // console.log("probably not logged in!");
    //     }
    //   }),
    //   (err: any) => {
    //     // console.log(err);
    //     this.connectionToast.openToast();
    //   };
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
