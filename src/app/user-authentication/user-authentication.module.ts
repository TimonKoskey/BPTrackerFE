import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AuthenticationAPIService } from './authentication-api.service';
import { UserRegisterComponent } from './user-register/user-register.component';
// import { UserLoginComponent } from './user-login/user-login.component';



@NgModule({
  declarations: [
    // UserRegisterComponent,
    // UserLoginComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
  ],

  providers: [ AuthenticationAPIService ]
})

export class UserAuthenticationModule { }
