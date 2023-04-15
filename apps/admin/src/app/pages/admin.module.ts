import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesModule } from './categories/categories.module';

@NgModule({
	imports: [
		CommonModule,
		AdminRoutingModule,
  CategoriesModule
	]
})
export class AdminModule { }
