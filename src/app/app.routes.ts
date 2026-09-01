import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LoginPageComponent } from './features/auth/login-page.component';
import { RegisterPageComponent } from './features/auth/register-page.component';
import { CategoriesPageComponent } from './features/categories/categories-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { TransactionsPageComponent } from './features/transactions/transactions-page.component';
export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, title: 'Iniciar sesión | Mis Finanzas' },
  { path: 'registro', component: RegisterPageComponent, title: 'Crear cuenta | Mis Finanzas' },
  { path: 'resumen', component: DashboardPageComponent, canActivate: [authGuard], title: 'Resumen | Mis Finanzas' },
  { path: 'transacciones', component: TransactionsPageComponent, canActivate: [authGuard], title: 'Transacciones | Mis Finanzas' },
  { path: 'categorias', component: CategoriesPageComponent, canActivate: [authGuard], title: 'Categorías | Mis Finanzas' },
  { path: '', pathMatch: 'full', redirectTo: 'resumen' }, { path: '**', redirectTo: 'resumen' }
];
