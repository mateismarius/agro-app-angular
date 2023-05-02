import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Define a FormGroup for the login form with validation rules for each field
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  // Define a variable to store the URL to return to after successful login
  returnUrl: string;

  constructor(
    // Inject the AccountService, Router, and ActivatedRoute dependencies
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Set the returnUrl variable to the value of the 'returnUrl' query parameter
    // or the '/shop' path if the query parameter is not present
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
  }

  // Handle the form submission by calling the login() method of the accountService
  // and navigating to the returnUrl on success
  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
    });
  }
}


