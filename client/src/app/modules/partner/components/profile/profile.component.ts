import { Component, OnInit } from "@angular/core";
import { PartnerService } from "../../partner.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private user;
  private profileType: string = "";

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.partnerService.getUserData().subscribe((data: any) => {
      if (data) {
        this.user = data.data;
        if (this.user.partner && this.user.partner.qualification) {
          switch (this.user.partner.qualification) {
            case 1:
              this.profileType = "Bronce";
              break;
            case 2:
              this.profileType = "Plata";
              break;
            case 3:
              this.profileType = "Oro";
              break;
          }
        }
      }
    });
  }
}
