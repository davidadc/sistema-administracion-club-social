import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartnerComponent } from "./partner.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ProfileComponent } from "./components/profile/profile.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { NewsComponent } from "./components/news/news.component";
import { EventsComponent } from "./components/events/events.component";
import { BenefitsComponent } from "./components/benefits/benefits.component";
import { NewsItemComponent } from "./components/news-item/news-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UpgradeProfileComponent } from './components/upgrade-profile/upgrade-profile.component';

@NgModule({
  declarations: [
    PartnerComponent,
    ProfileComponent,
    HomeComponent,
    EditProfileComponent,
    NewsComponent,
    EventsComponent,
    BenefitsComponent,
    NewsItemComponent,
    UpgradeProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PartnerModule {}
