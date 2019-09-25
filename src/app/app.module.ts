import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { PersistenceModule } from 'angular-persistence';

// import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { UnsignedUserAPIService } from './unsigned-users-api/unsigned-user-api.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserRegisterComponent } from './user-authentication/user-register/user-register.component';
import { AuthenticationAPIService } from './user-authentication/authentication-api.service';
import { SessionDataService } from './session-data/session-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomePageComponent,
    FooterComponent,
    ContactUsComponent,
    UserRegisterComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    PersistenceModule,
    UserDashboardModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],

  providers: [ 
    UnsignedUserAPIService,
    AuthenticationAPIService,
    SessionDataService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
