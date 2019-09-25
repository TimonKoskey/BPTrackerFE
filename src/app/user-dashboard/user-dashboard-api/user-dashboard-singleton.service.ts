import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { SessionDataService } from '../../session-data/session-data.service';
import { catchError, map, tap } from 'rxjs/operators';
import { storage } from 'firebase';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardSingletonService {
  private baseUrl = 'http://127.0.0.1:8000/user/serializers'
  private userData;

  constructor(
    private http: HttpClient,
    private routes: Router,
    private session_data: SessionDataService,
  ) { }

  getClientBPDataList(user_id){
    return this.http.get(`${this.baseUrl}/datalist/${user_id}`)
  }

}
