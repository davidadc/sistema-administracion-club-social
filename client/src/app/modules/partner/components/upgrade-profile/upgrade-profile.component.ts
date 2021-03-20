import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PartnerService } from "../../partner.service";

@Component({
  selector: "app-upgrade-profile",
  templateUrl: "./upgrade-profile.component.html",
  styleUrls: ["./upgrade-profile.component.scss"],
})
export class UpgradeProfileComponent implements OnInit {
  public profileType: number = 1;

  constructor(private partnetService: PartnerService, private router: Router) {}

  ngOnInit() {}

  upgrade() {
    let body = {
      qualification: this.profileType,
    };
    this.partnetService.setProfile(body).subscribe((data) => {
      if (data) {
        console.log(data);
        this.router.navigate(["/partner/"]);
      }
    });
  }
}
