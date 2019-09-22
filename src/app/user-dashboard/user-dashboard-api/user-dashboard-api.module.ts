import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserDashboardSingletonService } from './user-dashboard-singleton.service';



@NgModule({})
export class UserDashboardAPIModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserDashboardAPIModule,
      providers:    [ UserDashboardSingletonService ]
    };
  }
}
