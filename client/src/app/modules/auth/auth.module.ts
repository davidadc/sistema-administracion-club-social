import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RegisterComponent } from "./components/register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
