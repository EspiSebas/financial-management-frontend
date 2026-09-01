import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../api.config';
export interface AuthUser { id: string | number; name: string; email: string; }
export interface AuthResponse { token: string; user: AuthUser; }
export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { name: string; email: string; password: string; }
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${API_URL}/auth`;
  readonly user = signal<AuthUser | null>(this.getStoredUser());
  constructor(private readonly http: HttpClient) { }
  login(data: LoginRequest): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(tap(response => this.saveSession(response))); }
  register(data: RegisterRequest): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(tap(response => this.saveSession(response))); }
  token(): string | null { return localStorage.getItem('financial_management_token'); }
  logout(): void { localStorage.removeItem('financial_management_token'); localStorage.removeItem('financial_management_user'); this.user.set(null); }
  private saveSession(response: AuthResponse): void { localStorage.setItem('financial_management_token', response.token); localStorage.setItem('financial_management_user', JSON.stringify(response.user)); this.user.set(response.user); }
  private getStoredUser(): AuthUser | null { const value = localStorage.getItem('financial_management_user'); return value ? JSON.parse(value) as AuthUser : null; }
}
