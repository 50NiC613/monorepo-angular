import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories/')
  }
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/categories/${id}`)
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`http://localhost:3000/categories/`, category)
  }
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`http://localhost:3000/categories/${id}`, category)
  }
  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`http://localhost:3000/categories/${id}`)
  }
}
