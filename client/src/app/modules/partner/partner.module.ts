import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [PartnerComponent, ProfileComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PartnerModule { }
