import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ToastService } from './services/toast.service';
import { AuthService } from './services/auth.service';
import { AuthHelperService } from './services/auth-helper.service';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ValidateService } from './services/validate.service';
import { MeComponent } from './components/pages/me/me.component';
import { VenuesService } from './services/venues.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    MeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterializeModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ApiService,
    AuthHelperService,
    AuthService,
    ToastService,
    ValidateService,
    VenuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
