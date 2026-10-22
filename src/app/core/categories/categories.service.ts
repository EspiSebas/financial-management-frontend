import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';

export interface Category {
  id: number;
  name: string;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly apiUrl = API_URL;

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: Omit<Category, 'id'>): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/category`, category);
  }

  updateCategory(id: number, category: Omit<Category, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/category/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
