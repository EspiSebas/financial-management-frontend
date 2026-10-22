import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, CategoriesService } from '../../core/categories/categories.service';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Omit<Category, 'id'> = { name: '', type: 'Gasto' };
  editingId: number | null = null;
  editingCategory: Omit<Category, 'id'> = { name: '', type: 'Gasto' };
  loading = false;
  saving = false;
  errorMessage = '';

  constructor(private readonly categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.errorMessage = '';
    this.categoriesService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las categorías.';
        this.loading = false;
      }
    });
  }

  addCategory(): void {
    const category = this.normalized(this.newCategory);
    if (!category.name || this.saving) return;

    this.saving = true;
    this.errorMessage = '';
    this.categoriesService.createCategory(category).subscribe({
      next: () => {
        this.newCategory = { name: '', type: 'Gasto' };
        this.saving = false;
        this.loadCategories();
      },
      error: () => {
        this.errorMessage = 'No se pudo crear la categoría.';
        this.saving = false;
      }
    });
  }

  startEditing(category: Category): void {
    this.editingId = category.id;
    this.editingCategory = { name: category.name, type: category.type };
    this.errorMessage = '';
  }

  cancelEditing(): void {
    this.editingId = null;
  }

  saveCategory(id: number): void {
    const category = this.normalized(this.editingCategory);
    if (!category.name || this.saving) return;

    this.saving = true;
    this.errorMessage = '';
    this.categoriesService.updateCategory(id, category).subscribe({
      next: () => {
        this.editingId = null;
        this.saving = false;
        this.loadCategories();
      },
      error: () => {
        this.errorMessage = 'No se pudo actualizar la categoría.';
        this.saving = false;
      }
    });
  }

  removeCategory(category: Category): void {
    if (this.saving) return;

    this.saving = true;
    this.errorMessage = '';
    this.categoriesService.deleteCategory(category.id).subscribe({
      next: () => {
        this.categories = this.categories.filter(item => item.id !== category.id);
        this.saving = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo eliminar la categoría.';
        this.saving = false;
      }
    });
  }

  private normalized(category: Omit<Category, 'id'>): Omit<Category, 'id'> {
    return { name: category.name.trim(), type: category.type };
  }
}
