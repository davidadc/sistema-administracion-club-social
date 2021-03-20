import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public newUserForm: FormGroup;
  public errorMessage: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.newUserForm = this.fb.group(
      {
        name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            ),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.pattern(
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            ),
          ],
        ],
      },
      this.passwordMatchValidator
    );
  }

  get name() {
    return this.newUserForm.get("name");
  }

  get phone() {
    return this.newUserForm.get("phone");
  }

  get email() {
    return this.newUserForm.get("email");
  }

  get password() {
    return this.newUserForm.get("password");
  }

  get confirmPassword() {
    return this.newUserForm.get("confirmPassword");
  }

  get confirmPasswordValue() {
    return (
      this.newUserForm.get("password").value ==
      this.newUserForm.get("confirmPassword").value
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  registerNewUser(): void {
    this.authService.registerUser(this.newUserForm.value).subscribe(
      (res) => {
        this.errorMessage = "";
        this.initializeForm();
        this.router.navigate(["/login"]);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
