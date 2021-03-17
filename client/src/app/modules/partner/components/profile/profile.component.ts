import { Component, OnInit } from "@angular/core";
import { PartnerService } from "../../partner.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private user;

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.partnerService.getUserData().subscribe((data: any) => {
      if (data) {
        this.user = data.data;
      }
    });
  }
}
