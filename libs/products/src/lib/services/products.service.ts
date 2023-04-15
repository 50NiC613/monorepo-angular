import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:3000/products/${id}`);
  }

}
