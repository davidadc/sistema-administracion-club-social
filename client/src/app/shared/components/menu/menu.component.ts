import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Input() tabs: any[];
  @Input() profileType: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    this.router.navigate(["/login"]);
  }
}
