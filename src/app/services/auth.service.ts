import { computed, inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthStatus } from '../models/auth-status.enum';
import { LoginResponse } from '../models/login-response';
import { CheckTokenResponse, RegisterResponse } from '../models';

const url = environment.baseUrl + 'auth/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);
  private _currentUser = signal<Usuario | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //!Al mundo exterior

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthenticated(user: Usuario, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  public login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthenticated(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  public register(
    name: string,
    email: string,
    password: string,
    roles: string
  ): Observable<boolean> {
    const url = `${this.baseUrl}auth/register`;
    const body = { name, email, password, roles };

    return this.http.post<RegisterResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthenticated(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  public checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ token, user }) => this.setAuthenticated(user, token)),
      //Error
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  public logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
