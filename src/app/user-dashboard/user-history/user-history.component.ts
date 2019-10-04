import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../../session-data/session-data.service';
import { UserDashboardSingletonService } from '../user-dashboard-api/user-dashboard-singleton.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  user;
  userdata;

  constructor(
    private dataservice: UserDashboardSingletonService,
    private session_data: SessionDataService
  ) { }

  ngOnInit() {
    this.user = this.session_data.user
    this.dataservice.getClientBPDataList(this.user['id']).subscribe(dataset => {
        this.userdata = dataset;
        this.userdata = this.dataservice.setDateTime(this.userdata)
        console.log(this.userdata)
    }, (error) => {

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
