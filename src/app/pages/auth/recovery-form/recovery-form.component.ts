import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';


@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrls: ['./recovery-form.component.scss']
})
export class RecoveryFormComponent {

  // constructor(private authApi: AuthApiService) { }

  recoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  errorCode = "";
  errorMessage = "";
  passwordMismatch = false;

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;

  ngOnInit(): void {
  }

  // onSubmit(){
  //   this.saved = true;

  //   let email = this.recoveryForm.controls.email.value as string

  //   // if (this.recoveryForm.valid){
  //     this.isSending = true;

  //     // console.log(this.recoveryForm.value);
  //     this.authApi.sendPasswordResetEmail(email)
  //       .then(
  //         res => {
  //           // console.log(res);
  //           this.showPrompt =  true;
  //           this.isSending = false;
  //         },
  //         err => {
  //           // console.log(err);
  //           this.isSending = false;
  //           this.errorMessage = err.message.replace("Firebase:", "").replace(/\(.*\)/, "").trim().replace(/\.$/, "");
  //           this.errorCode = err.code;
  //           // console.log(this.errorCode, this.errorMessage)
  //         }
  //       )
  //   // }
  //   // else{
  //   //   // console.log("form is invalid");
  //   // }
  // }
  
}
