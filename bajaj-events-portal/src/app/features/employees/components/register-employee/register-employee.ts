import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { EmployeeRegistration } from '../../models/employee-registration';
import { EmployeesApi } from '../../service/employees-api';

@Component({
  selector: 'app-register-employee',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register-employee.html',
  styleUrl: './register-employee.css',
})
export class RegisterEmployee {
  protected title: string = 'Register New Bajaj Employee!';
  protected register: EmployeeRegistration = new EmployeeRegistration();
  private _employeesApi = inject(EmployeesApi);
  private _router = inject(Router);
  private _employeesApiSubscription: Subscription;

  protected onEmployeeSubmit(): void {
    this._employeesApiSubscription = this._employeesApi
      .addNewEmployee(this.register.employeeForm.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data.acknowledged === true) {
            this._router.navigate(['/employees']);
          }
        },
      });
  }

  ngOnDestroy(): void {
    if (this._employeesApiSubscription) {
      this._employeesApiSubscription.unsubscribe();
    }
  }
}
