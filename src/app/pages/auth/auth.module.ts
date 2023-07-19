import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { LoginFormComponent } from './login-form/login-form.component';
import { RecoveryFormComponent } from './recovery-form/recovery-form.component';
import { ResetFormComponent } from './reset-form/reset-form.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    RecoveryFormComponent,
    ResetFormComponent,
    AuthPage
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
