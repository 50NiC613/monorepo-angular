import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category, IGDBGamesService, IconService } from '@eshop/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'libs/products/src/lib/models/game';

@Component({
  selector: 'admin-igdb-games',
  templateUrl: './igdb-games.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [MessageService, IconService]
})
export class IGDBGamesComponent implements OnInit {
  form!: FormGroup;

  @Input()
  id!: string;

  @Input()
  title!: string;
  categoryDialog = false;

  deleteProductDialog = false;

  deleteProductsDialog = false;

  categories: Category[] = [];

  category: Category = {};

  selectedProducts: Category[] = [];

  submitted = false;
  force = true;

  cols: any[] = [];

  statuses: any[] = [];

  icons: any[] = [];

  selectedIcon!: any;

  filteredIcons: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private iconService: IconService,
    private gamesService: IGDBGamesService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required]
    });
    this.iconService.getIcons().subscribe((data) => {
      data = data.filter((value) => {
        return value.icon.tags.indexOf('deprecate') === -1;
      });

      const icons = data;
      icons.sort((icon1, icon2) => {
        if (icon1.properties.name < icon2.properties.name) return -1;
        // eslint-disable-next-line no-dupe-else-if
        else if (icon1.properties.name < icon2.properties.name) return 1;
        else return 0;
      });

      this.icons = icons;
      this.filteredIcons = data;
    });
    this.gamesService.getGames().subscribe((data: any[]) => {
      console.log(data);
      this.categories = data;
    });

    this.cols = [
      { field: 'category', header: 'Categoria' },
      { field: 'icon', header: 'Icono' },
      { field: 'name', header: 'Nombre' }
    ];
  }

  filtrar(event: { query: any }) {
    const filtered: any[] = [];
    const query = event.query;
    console.log(query);
    for (let i = 0; i < this.icons.length; i++) {
      const icon = this.icons[i];
      if (icon.properties.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(icon);
      }
    }
    this.filteredIcons = filtered;
  }

  openNew() {
    this.category = {};
    this.submitted = false;
    this.categoryDialog = true;
  }



  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteProduct(category: Category) {
    this.deleteProductDialog = true;
    this.category = { ...category };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.categories = this.categories.filter((val) => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.categories = this.categories.filter((val) => val.id !== this.category.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
    this.category = {};
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.selectedIcon);
    console.log(this.form.controls['name'].value, ' : Nombre');
    console.log(this.form.controls['color'].value, ' : Color');
    console.log(this.selectedIcon.properties.name, ' : Icono');
    this.category = {
      name: this.form.controls['name'].value,
      color: this.form.controls['color'].value,
      icon: this.selectedIcon.properties.name
    };
    if (this.category.name?.trim()) {
      if (this.category.id) {
        this.categories[this.findIndexById(this.category.id)] = this.category;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
      } else {

        this.categories = [...this.categories];
        this.categoryDialog = false;
        this.category = {};
      }
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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
