import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { HomeComponent } from './modules/partner/components/home/home.component';
import { ProfileComponent } from './modules/partner/components/profile/profile.component';
import { PartnerComponent }  from './modules/partner/partner.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { 
    path: 'partner', 
    component: PartnerComponent, 
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
    ] 
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
