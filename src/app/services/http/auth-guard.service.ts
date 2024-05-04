import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router
    ) { }

  public canActivate(): boolean {
    var token = localStorage.getItem("token");
    if (token !== null) {
      return true;
    }
    this.router.navigate(["/auth/login"]);
    return false;
  }

  public isTokenPresent(): boolean {
    let result: boolean = false;
    let token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      result = true;
    }
    return result;
  }

  public setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public removeToken(): void {
    localStorage.removeItem("token");
  }

  public getToken(): any {
    return localStorage.getItem("token");
  }

  public getDecodedToken(): any {
    let decodedToken;
    let storageToken = this.getToken();
    if (storageToken !== null) {
      decodedToken = jwtDecode(storageToken);
    }
    return decodedToken;
  }

  public unauthorizedLogout(): void {
    this.removeToken();
    this.router.navigate(["/auth/login"]);
  }
}
