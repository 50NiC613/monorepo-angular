import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoriesService, Category } from '@eshop/products';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated,
  providers: [MessageService]

})
export class CategoriesComponent implements OnInit {

  productDialog = false;

  deleteProductDialog = false;

  deleteProductsDialog = false;

  categories: Category[] = [];

  category: Category = {};

  selectedProducts: Category[] = [];

  submitted = false;

  cols: any[] = [];

  statuses: any[] = [];


  constructor(private categoriesService: CategoriesService, private messageService: MessageService) { }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data: Category[]) => this.categories = data);

    this.cols = [
      { field: 'category', header: 'Category' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' }
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.category = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(category: Category) {
    this.category = { ...category };
    this.productDialog = true;
  }

  deleteProduct(category: Category) {
    this.deleteProductDialog = true;
    this.category = { ...category };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.categories = this.categories.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.categories = this.categories.filter(val => val.id !== this.category.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
    this.category = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.category.name?.trim()) {
      if (this.category.id) {
        // @ts-ignore
        this.category.inventoryStatus = this.category.inventoryStatus.value ? this.category.inventoryStatus.value : this.category.inventoryStatus;
        this.categories[this.findIndexById(this.category.id)] = this.category;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
      } else {
        this.category.id = this.createId();
        this.category.icon = 'category-placeholder.svg';
        // @ts-ignore
        this.category.inventoryStatus = this.category.inventoryStatus ? this.category.inventoryStatus.value : 'INSTOCK';
        this.categories.push(this.category);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
      }

      this.categories = [...this.categories];
      this.productDialog = false;
      this.category = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
