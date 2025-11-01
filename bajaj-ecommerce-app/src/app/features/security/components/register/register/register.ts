import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApi } from '../../../services/user-api';

@Component({
  selector: 'bajaj-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private _fb = inject(FormBuilder);
  private _userService = inject(UserApi);
  private _router = inject(Router);

  registerForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor() {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: 'customer',
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this._userService.registerUser(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.loading = false;
        this.successMessage = 'Registration successful!';
        setTimeout(() => this._router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed!';
      },
    });
  }
}
