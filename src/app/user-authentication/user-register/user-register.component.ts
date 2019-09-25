import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationAPIService } from '../authentication-api.service'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerUser: FormGroup;
  registerUserFormSubmited = false;
  confirm_password

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authenticationService: AuthenticationAPIService
  ) { }

  ngOnInit() {
    this.registerUser = this.fb.group({
      'email': new FormControl('', Validators.required),
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'main_phone_number': new FormControl('', Validators.required),
      'alt_phone_number': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'county': new FormControl('', Validators.required),
      'sub_county': new FormControl('', Validators.required),
      'village_or_estate': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registerUser.valid && this.password.value === this.confirm_password){
      this.authenticationService.registerClient(this.registerUser.value).subscribe(data => {
        this.route.navigate(['/account/dashboard']);
      }, (error) => {
        
      })
    }
    this.registerUserFormSubmited = true;
  }

  get email() { return this.registerUser.get('email'); }
  get first_name() { return this.registerUser.get('first_name'); }
  get last_name() { return this.registerUser.get('last_name'); }
  get main_phone_number() { return this.registerUser.get('main_phone_number'); }
  get alt_phone_number() { return this.registerUser.get('alt_phone_number'); }
  get age() { return this.registerUser.get('age'); }
  get gender() { return this.registerUser.get('gender'); }
  get county() { return this.registerUser.get('county'); }
  get sub_county() { return this.registerUser.get('sub_county'); }
  get village_or_estate() { return this.registerUser.get('village_or_estate'); }
  get password() { return this.registerUser.get('password'); }
}
