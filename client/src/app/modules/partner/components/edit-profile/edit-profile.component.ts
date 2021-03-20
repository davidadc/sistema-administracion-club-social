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
  public user;
  public profileType: number = 1;
  public showAlertUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.showAlertUpdate = false;
    this.initializeForm();
    this.partnerService.getUserData().subscribe((data: any) => {
      if (data) {
        this.user = data.data;
        this.profileType =
          this.user.partner && this.user.partner.qualification
            ? this.user.partner.qualification
            : 0;
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
    this.partnerService
      .updateUser(this.editProfileForm.value)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(["/partner/profile"]);
      });
  }

  upgradePartnerType() {
    if (this.profileType == 0) {
      this.partnerService
        .deletePartnerProfile(this.user.partner.id)
        .subscribe((data) => {
          console.log(data);
        });
    }
    if (
      this.user.partner.qualification !== this.profileType &&
      this.profileType != 0
    ) {
      let body = {
        qualification: this.profileType,
      };
      this.partnerService
        .upgradeProfile(this.user.partner.id, body)
        .subscribe((data) => {
          console.log(data);
        });
    }
    this.showAlertUpdate = true;
    this.router.navigate(["/partner/profile"]);
  }
}
