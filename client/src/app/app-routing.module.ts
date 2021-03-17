import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Admin Module
import { AdminComponent } from "./modules/admin/admin.component";
import { LoginComponent } from "./modules/auth/components/login/login.component";
import { RegisterComponent } from "./modules/auth/components/register/register.component";

//Partner Module
import { PartnerComponent } from "./modules/partner/partner.component";
import * as PartnerHome from "./modules/partner/components/home/home.component";
import * as PartnerProfile from "./modules/partner/components/profile/profile.component";
import * as PartnerEditProfile from "./modules/partner/components/edit-profile/edit-profile.component";
import { BenefitsComponent } from "./modules/partner/components/benefits/benefits.component";
import { EventsComponent } from "./modules/partner/components/events/events.component";
import { NewsComponent } from "./modules/partner/components/news/news.component";
import { NewsItemComponent } from "./modules/partner/components/news-item/news-item.component";
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin", component: AdminComponent },
  {
    path: "partner",
    component: PartnerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: PartnerHome.HomeComponent },
      { path: "profile", component: PartnerProfile.ProfileComponent },
      {
        path: "profile/edit",
        component: PartnerEditProfile.EditProfileComponent,
      },
      { path: "news", component: NewsComponent },
      { path: "news/:id", component: NewsItemComponent },
      { path: "benefits", component: BenefitsComponent },
      { path: "events", component: EventsComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
