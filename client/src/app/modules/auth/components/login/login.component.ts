import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          ),
        ],
      ],
    });
  }

  get email() {
    return this.userForm.get("email");
  }

  get password() {
    return this.userForm.get("password");
  }

  loginUser() {
    this.authService.loginUser(this.userForm.value).subscribe((res: any) => {
      this.initializeForm();
      this.authService.userData = res.data;
      localStorage.setItem(
        "accessToken",
        this.authService.userData.accessToken
      );
      localStorage.setItem("id", this.authService.userData.user.id);
      this.router.navigate(["/partner"]);
    });
  }
}
