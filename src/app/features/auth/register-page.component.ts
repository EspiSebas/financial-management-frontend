import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({ selector: 'app-register-page', standalone: true, imports: [FormsModule, RouterLink], templateUrl: './register-page.component.html', styleUrl: './auth-page.component.css' })
export class RegisterPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  account = { name: '', email: '', password: '' };
  error = ''; loading = false;
  submit(): void { this.error = ''; this.loading = true; this.auth.register(this.account).subscribe({ next: () => this.router.navigateByUrl('/resumen'), error: error => { this.loading = false; this.error = error.error?.message ?? 'No pudimos crear tu cuenta. Inténtalo de nuevo.'; } }); }
}
