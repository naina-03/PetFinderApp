import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  baseUrl = environment.apiUrl + '/Pets';

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Both email and password are required.';
      return;
    }

    this.http
      .post<{ token: string }>(this.baseUrl + '/Login', {
        email: this.email,
        password: this.password
      })
      .subscribe({
        next: (res) => {
          this.auth.login(res.token);
          this.router.navigate(['/home']);
        },
        error: () => {
          this.errorMessage = 'Login failed. Please check credentials.';
        }
      });
  }
}