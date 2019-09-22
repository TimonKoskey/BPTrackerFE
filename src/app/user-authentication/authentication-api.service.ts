import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { PersistenceService, StorageType} from 'angular-persistence';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationAPIService {

  constructor(
    private http: HttpClient,
    private routes: Router,
    private persistence: PersistenceService
  ) { }

  clientLogin(login_cred){
    return this.http.post('http://127.0.0.1:8000/auth/serializers/login',login_cred);
  }
}
