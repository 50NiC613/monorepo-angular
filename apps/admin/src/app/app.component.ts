import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './shared/layout/service/app.layout.service';

@Component({
    selector: 'admin-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true; //enables core ripple functionality

        //optional configuration with the default configuration
        this.layoutService.config = {
            ripple: true, //toggles ripple on and off
            inputStyle: 'outlined', //default style for input elements
            menuMode: 'static', //layout mode of the menu, valid values are "static" and "overlay"
            colorScheme: 'dark', //color scheme of the template, valid values are "light" and "dark"
            theme: 'arya-green', //default component theme for PrimeNG
            scale: 16 //size of the body font size to scale the whole application
        };
    }
}
