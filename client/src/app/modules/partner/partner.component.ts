import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

  private routerMenu = [
    { title: 'Home', url: '/partner' },
    { title: 'Mi Perfil', url: '/partner/profile' },
  ]

  constructor() { }

  ngOnInit() {
  }

}
