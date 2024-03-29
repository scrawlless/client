import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHrefModule } from '../../_modules/base-href/base-href.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private links: BaseHrefModule
  ) { /*this.updateUserData();*/ } // Hardcoded solution while we don't have functioning back-end

  private updateUserData() {
    this.profile().subscribe((data) => {
      this.user = data;
    }, (err) => {
      this.logout();
    });
  }

  url: string = this.links.api;

  user: any = {};

  private token: string;

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public logout(params: any = {}): void {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigate(['/'], params);
  }

  public getUserDetails(): any {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user): Observable<any> {
    return this.http.post(this.url + `api/register`, user).pipe(
      map((token: any) => {
        if (token) {
          this.saveToken(token);
          this.updateUserData();
        }
        return token;
      })
    );
  }

  public login(user): Observable<any> {
    return this.http.post(this.url + `api/login`, user).pipe(
      map((token: any) => {
        if (token) {
          this.saveToken(token);
          this.updateUserData();
        }
        return token;
      })
    );
  }

  // profile(data: any = {}): Observable<Object> {
  //   var req = JSON.stringify(data);

  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', 'application/json');
  //   headers = headers.append('Content-Type', 'application/json');
  //   headers = headers.append("Authorization", `Bearer ${this.getToken()}`);

  //   return this.http.post(this.url + `api/albums.get`, req, { headers: headers }).pipe(
  //     map((response: Response) => {
  //       let data: any = response;
  //       if (data) {
  //         return data;
  //       } else {
  //         return "Error";
  //       }
  //     }));
  // }

  public profile(): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append("Authorization", `Bearer ${this.getToken()}`);

    return this.http.post(this.url + `api/user.get`, '', { headers }).pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }
}