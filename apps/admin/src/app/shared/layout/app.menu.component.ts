import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'admin-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Admin',
        items: [
          { label: 'Principal', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Juegos', icon: 'pi pi-fw pi-star', routerLink: ['admin/games'] },
          { label: 'Desconectarse', icon: 'pi pi-fw pi-sign-out', routerLink: ['logout'] }
        ]
      },
      {
        label: 'IGDB',
        items: [
          { label: 'Juegos', icon: 'pi pi-fw pi-star', routerLink: ['admin/igdb/games'] },
          { label: 'Generos', icon: 'pi pi-fw pi-star', routerLink: ['admin/igdb/genres'] },
          { label: 'Franquicias', icon: 'pi pi-fw pi-star', routerLink: ['admin/igdb/franchiese'] },
          { label: 'Compañias', icon: 'pi pi-fw pi-star', routerLink: ['admin/igdb/companies'] },
          { label: 'Busqueda', icon: 'pi pi-fw pi-search', routerLink: ['admin/igdb/search'] },
        ]
      }
    ];
  }
}
