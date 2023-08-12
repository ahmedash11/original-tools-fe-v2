import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CurrentuserService } from './currentuser.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  token: string = '';
  tokenKey: string = 'x-access-token';
  currentUserKey: string = 'x-current-user';
  loginUrl: string = 'api/users/login';

  constructor(
    private router: Router,
    private http: HttpClient,
    private currentUserService: CurrentuserService
  ) {}

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  setCurrentUser(customer: any) {
    if (customer) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(customer));
    }
  }
  getCurrentUser() {
    let userData = localStorage.getItem(this.currentUserKey);
    if (userData) return JSON.parse(userData);
    return '';
  }
  getToken() {
    let token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.token = token;
      return token;
    } else {
      this.logout();
      return null;
    }
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/auth/login']);
  }

  setCurrentUserData(user: any) {
    this.setToken(user?.token);
    this.setCurrentUser(user?.customer);
    this.currentUserService.setUser(this.getCurrentUser());
  }

  login(data: any): Promise<any> {
    return this.http.post<any>(this.loginUrl, data).toPromise();
  }

  loggedIn() {
    return !!localStorage.getItem(this.tokenKey);
  }
}
