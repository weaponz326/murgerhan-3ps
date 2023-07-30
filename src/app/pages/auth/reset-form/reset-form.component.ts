import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';


@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss']
})
export class ResetFormComponent {

  constructor(
    private authApi: AuthApiService,
  ) { }

  resetForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  })

  errorCode = "";
  errorMessage = "";
  passwordMismatch = false;

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;

  onSubmit(){
    this.saved = true;

    let code = this.resetForm.controls.code.value as string
    let password1 = this.resetForm.controls.password1.value as string
    let password2 = this.resetForm.controls.password2.value as string

    if (this.resetForm.valid && password1 == password2){
      this.isSending = true;

      this.authApi.confirmPasswordReset(code, password1)
        .then(
          (res: any) => {
            // console.log(res);
            this.isSending = false;
            this.showPrompt = true;
          },
          (err: any) => {
            // console.log(err);
            this.isSending = false;
            this.errorMessage = err.message.replace("Firebase:", "").replace(/\(.*\)/, "").trim().replace(/\.$/, "");
            this.errorCode = err.code;
            // console.log(this.errorCode, this.errorMessage)
          }
        );
    }
    else{
      // console.log("password mismatch");
      this.passwordMismatch = true;
    }

    // console.log(this.resetForm.value);
  }

}
