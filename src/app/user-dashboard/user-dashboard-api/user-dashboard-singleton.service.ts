import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardSingletonService {
  private data;

  constructor() { }

  set Data(value){
    this.data = value;
  }

  get Data(){
    return this.data
  }
}
