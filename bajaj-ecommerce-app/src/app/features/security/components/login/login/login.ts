import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApi } from '../../../services/user-api';

@Component({
  selector: 'bajaj-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private _fb = inject(FormBuilder);
  private _userService = inject(UserApi);
  private _router = inject(Router);

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const credentials = this.loginForm.value;

    this._userService.loginUser(credentials).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'Login successful!';

        // ✅ Save token (you can modify this for localStorage)
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('role', res.user.role);

        setTimeout(() => this._router.navigate(['/home']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password';
      },
    });
  }
}
