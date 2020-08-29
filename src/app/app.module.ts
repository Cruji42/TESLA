import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent} from './footer/footer.component';
import { NavbarComponent} from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard} from './shared/guard';
import { CatalogComponent } from './catalog/catalog.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ForgotComponent } from './forgot/forgot.component';
import {LoginComponent} from './login/login.component';
import { DataTablesModule } from 'angular-datatables';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LandingPageComponent,
    CatalogComponent,
    AboutComponent,
    RegistrarComponent,
    ForgotComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    ChartModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
