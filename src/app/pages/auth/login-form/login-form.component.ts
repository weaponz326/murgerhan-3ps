import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
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
          this.router.navigateByUrl('/landing');
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

}
