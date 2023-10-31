import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AppLayoutModule } from './shared/layout/app.layout.module';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent,NotfoundComponent, DashboardComponent, SidebarComponent],
    imports: [AppLayoutModule,HttpClientModule,BrowserModule, AppRoutingModule],
    providers: [ProductService, CountryService, CustomerService, NodeService, PhotoService],
    bootstrap: [AppComponent]
})
export class AppModule {}
