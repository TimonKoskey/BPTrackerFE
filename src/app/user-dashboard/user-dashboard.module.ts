import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardAPIModule } from './user-dashboard-api/user-dashboard-api.module';
import { SharedModule } from '../shared/shared.module';

import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserHistoryComponent } from './user-history/user-history.component';



@NgModule({
  
  declarations: [
    ContainerComponent,
    DashboardComponent,
    UserProfileComponent,
    UserHistoryComponent,
  ],

  imports: [
    CommonModule,
    UserDashboardAPIModule.forRoot(),
    SharedModule,
  ]

})
export class UserDashboardModule { }
