import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDashboardSingletonService } from '../user-dashboard-api/user-dashboard-singleton.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  mockData;

  constructor(
    private firestore: AngularFirestore,
    private dataservice: UserDashboardSingletonService,
  ) { }

  ngOnInit() {
    this.firestore.collection('patient-records').valueChanges().subscribe(data => {
      this.mockData = data;
      this.mockData.sort(function(a, b){return a.id - b.id})
      this.dataservice.Data = this.mockData;
   });
  }

  getBackgroundColor(status){
    if (status === 'Normal'){
        return '#14DE97';
    }
    if (status === 'Elevated'){
        return '#ffeb3b';
    }
    if (status === 'High'){
        return '#ff0000';
    }
  }

}
