import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'admin-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) {
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Token',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Renew',
            icon: 'pi pi-fw pi-user-plus',
            command: () => {
              this.layoutService.renewToken();
            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          }

        ]
      },

      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
  }
  renewToken() {
    return 0;
  }
}
