import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDashboardSingletonService } from '../user-dashboard-api/user-dashboard-singleton.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  mockData;

  constructor(
    private firestore: AngularFirestore,
    private dataservice: UserDashboardSingletonService,
  ) { }

  ngOnInit() {
  }

}
