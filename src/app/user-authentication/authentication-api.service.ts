import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { SessionDataService } from '../session-data/session-data.service';
import { catchError, map, tap } from 'rxjs/operators';
import { storage } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationAPIService {

  constructor(
    private http: HttpClient,
    private routes: Router,
    private session_data: SessionDataService,
  ) { }

  clientLogin(login_cred){
    return this.http.post('http://127.0.0.1:8000/auth/serializers/login',login_cred).map(data => {
      this.session_data.user = data[0];
      this.session_data.token = data[1];
      return data;
    });
  }

  registerClient(client_details){
    return this.http.post('http://127.0.0.1:8000/auth/serializers/register',client_details).map(data => {
      this.session_data.user = data[0];
      this.session_data.token = data[1];
      return data;
    });
  }
}
