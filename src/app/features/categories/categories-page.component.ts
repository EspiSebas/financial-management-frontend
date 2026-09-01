import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type CategoryType = 'Ingreso' | 'Gasto';
interface Category { id: number; name: string; type: CategoryType; icon: string; }

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {
  categories: Category[] = [
    { id: 1, name: 'Salario', type: 'Ingreso', icon: '💼' },
    { id: 2, name: 'Alimentación', type: 'Gasto', icon: '🛒' },
    { id: 3, name: 'Transporte', type: 'Gasto', icon: '🚗' },
    { id: 4, name: 'Entretenimiento', type: 'Gasto', icon: '🎬' }
  ];
  newCategory: Omit<Category, 'id'> = { name: '', type: 'Gasto', icon: '🏷️' };

  addCategory(): void {
    const name = this.newCategory.name.trim();
    if (!name) return;
    this.categories = [...this.categories, { ...this.newCategory, name, id: Date.now() }];
    this.newCategory = { name: '', type: 'Gasto', icon: '🏷️' };
  }

  removeCategory(id: number): void { this.categories = this.categories.filter(category => category.id !== id); }
}
