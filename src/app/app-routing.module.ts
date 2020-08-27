import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { LandingPageComponent} from './landing-page/landing-page.component';
import { CatalogComponent} from './catalog/catalog.component';
import { AboutComponent} from './about/about.component';
import { RegistrarComponent} from './registrar/registrar.component';
import {ForgotComponent} from './forgot/forgot.component';
import { AuthGuard} from './shared/guard';
import {ProfileComponent} from './layout/profile/profile.component';
import {OrdersComponent} from './layout/orders/orders.component';


const routes: Routes = [
  { path: 'order', loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule), canActivate: [AuthGuard]},
  // { path: 'profile', loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule), canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: CatalogComponent},
  { path: 'home', component: LandingPageComponent },
  { path: 'about', component: AboutComponent},
  { path: '', component: LandingPageComponent },
  { path: 'registrar', component: RegistrarComponent },
  {path: 'forgot', component: ForgotComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
