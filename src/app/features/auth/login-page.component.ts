import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({ selector: 'app-login-page', standalone: true, imports: [FormsModule, RouterLink], templateUrl: './login-page.component.html', styleUrl: './auth-page.component.css' })
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  credentials = { email: '', password: '' };
  error = ''; loading = false;
  submit(): void { this.error = ''; this.loading = true; this.auth.login(this.credentials).subscribe({ next: () => this.router.navigateByUrl('/resumen'), error: error => { this.loading = false; this.error = error.error?.message ?? 'No pudimos iniciar sesión. Revisa tus datos.'; } }); }
}
