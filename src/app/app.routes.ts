import { Routes } from '@angular/router';
import { CategoriesPageComponent } from './features/categories/categories-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { TransactionsPageComponent } from './features/transactions/transactions-page.component';

export const routes: Routes = [
  { path: 'resumen', component: DashboardPageComponent, title: 'Resumen | Mis Finanzas' },
  { path: 'transacciones', component: TransactionsPageComponent, title: 'Transacciones | Mis Finanzas' },
  { path: 'categorias', component: CategoriesPageComponent, title: 'Categorías | Mis Finanzas' },
  { path: '', pathMatch: 'full', redirectTo: 'resumen' },
  { path: '**', redirectTo: 'resumen' }
];
