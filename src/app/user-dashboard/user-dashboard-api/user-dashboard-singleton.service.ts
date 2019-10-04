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

  setDateTime(user_data){
    for(let data of user_data){
      const datetime = data['datetime'].split('T')
      data['date'] = datetime[0]
      data['time'] = datetime[1]
    }
    return user_data
  }

  getClientBPDataList(user_id){
    return this.http.get(`${this.baseUrl}/datalist/${user_id}`)
  }

  uploadTestResults(results){
    return this.http.post(`${this.baseUrl}/upload-test`, results)
  }

}
