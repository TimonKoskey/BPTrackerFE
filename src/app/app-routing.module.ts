import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { UserRegisterComponent } from './user-authentication/user-register/user-register.component';

import { ContainerComponent } from './user-dashboard/container/container.component';
import { DashboardComponent } from './user-dashboard/dashboard/dashboard.component';
import { UserHistoryComponent } from './user-dashboard/user-history/user-history.component';
import { UserProfileComponent } from './user-dashboard/user-profile/user-profile.component';




const routes: Routes = [
  { path: '', component: LandingPageComponent, children: [
    { path: '', component: HomePageComponent},
    { path: 'register', component: UserRegisterComponent},
    { path: 'contact-us', component: ContactUsComponent},
  ]},

  { path: 'account', component: ContainerComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'history', component: UserHistoryComponent},
    { path: 'profile', component: UserProfileComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[],
})
export class AppRoutingModule { }
