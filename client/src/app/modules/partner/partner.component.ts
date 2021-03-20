import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-partner",
  templateUrl: "./partner.component.html",
  styleUrls: ["./partner.component.scss"],
})
export class PartnerComponent implements OnInit {
  public routerMenu = [
    { title: "Home", url: "/partner" },
    { title: "Mi Perfil", url: "/partner/profile" },
    { title: "Noticias", url: "/partner/news" },
    { title: "Eventos", url: "/partner/events" },
    { title: "Beneficios", url: "/partner/benefits" },
  ];

  constructor() {}

  ngOnInit() {}
}
