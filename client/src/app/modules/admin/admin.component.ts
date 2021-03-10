import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private routerMenu = [
    { title: 'Home', url: '' },
    { title: 'Mi Perfil', url: '' },
  ]


  constructor() { }

  ngOnInit() {
  }

}
