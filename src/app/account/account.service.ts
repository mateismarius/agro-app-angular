import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(token: string | null) {
    // If the token is null, emit a null value and return an observable of null
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    // Set the Authorization header with the token value
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    // Make an HTTP GET request to the "account" endpoint to get the current user
    // and update the user in the currentUserSource subject
    return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          return user;
        } else {
          return null;
        }
      })
    );
  }

  login(values: any) {
    // Make an HTTP POST request to the "account/login" endpoint to log in the user
    // and update the user in the currentUserSource subject
    return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  register(values: any) {
    // Make an HTTP POST request to the "account/register" endpoint to register a new user
    // and update the user in the currentUserSource subject
    return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  logout() {
    // Remove the token from local storage and emit a null value in the currentUserSource subject
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    // Make an HTTP GET request to the "account/emailExists" endpoint to check if an email address exists
    return this.http.get<boolean>(
      this.baseUrl + 'account/emailExists?email=' + email
    );
  }

  getUserAddress() {
    // Make an HTTP GET request to the "account/address" endpoint to get the user's address
    return this.http.get<Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: Address) {
    // Make an HTTP PUT request to the "account/address" endpoint to update the user's address
    return this.http.put(this.baseUrl + 'account/address', address);
  }

}
