import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PartnerService } from "../../partner.service";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  public editProfileForm: FormGroup;
  private user;

  constructor(
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.partnerService.getUserData().subscribe((data: any) => {
      if (data) {
        this.user = data.data;
        this.editProfileForm.get("name").setValue(this.user.name);
        this.editProfileForm.get("email").setValue(this.user.email);
        this.editProfileForm.get("phone").setValue(this.user.phone);
      }
    });
  }

  initializeForm(): void {
    this.editProfileForm = this.fb.group({
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
    });
  }

  get name() {
    return this.editProfileForm.get("name");
  }

  get phone() {
    return this.editProfileForm.get("phone");
  }

  get email() {
    return this.editProfileForm.get("email");
  }

  get password() {
    return this.editProfileForm.get("password");
  }

  get confirmPassword() {
    return this.editProfileForm.get("confirmPassword");
  }

  get confirmPasswordValue() {
    return (
      this.editProfileForm.get("password").value ==
      this.editProfileForm.get("confirmPassword").value
    );
  }

  updateUser() {
    console.log(this.editProfileForm.value);
    this.partnerService
      .updateUser(this.editProfileForm.value)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(["/partner/profile"]);
      });
  }
}
