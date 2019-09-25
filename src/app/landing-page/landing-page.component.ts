import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationAPIService } from '../user-authentication/authentication-api.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  loginForm:FormGroup;
  loginErrors = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authenticationService: AuthenticationAPIService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      usernameOrEmail: '',
      password: ''
    });
  }

  onSubmit() {
    const login_cred = {
      'email': this.loginForm.value['usernameOrEmail'],
      'password': this.loginForm.value['password']
    }
    this.authenticationService.clientLogin(login_cred).subscribe(data => {
      this.route.navigate(['/account/dashboard']);
    }, (error) =>{
      this.loginErrors = true;
    })
  }

}
