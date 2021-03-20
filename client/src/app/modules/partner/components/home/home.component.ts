import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/modules/auth/auth.service";
import { PartnerService } from "../../partner.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public user;

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.partnerService.getUserData().subscribe((data: any) => {
      if (data) {
        this.user = data.data;
        console.log(this.user);
      }
    });
  }
}
