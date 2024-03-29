import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@eshop/ui';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MenubarModule } from 'primeng/menubar';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent],
  imports: [MenubarModule, BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }), UiModule, CardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
