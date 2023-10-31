import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { GamesModule } from './games/games.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    GamesModule
  ]
})
export class AdminModule { }
