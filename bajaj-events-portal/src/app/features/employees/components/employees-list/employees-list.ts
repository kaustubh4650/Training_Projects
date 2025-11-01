import { Component, inject } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeDetails } from '../employee-details/employee-details';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { EmployeesApi } from '../../service/employees-api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  imports: [EmployeeDetails, FormsModule, NgxPaginationModule, RouterLink],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList {
  protected title: string = 'Bajaj Finserv Employee List !';
  protected subTitle: string = 'Published by Bajaj Finserv Hr Deepartment!';

  protected columns: string[];

  constructor() {
    if (this.employees.length > 0) {
      const keys = Object.keys(this.employees[0]);
      this.columns = keys.map((key) => this.formatColumnName(key));
    } else {
      this.columns = [];
    }
  }

  // Utility method to convert 'eventCode' → 'Event Code'
  private formatColumnName(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }

  ngOnInit(): void {
    this._employeeServiceSubscription = this._employeesApi.getAllEvents().subscribe({
      next: (employeesData) => {
        console.log(employeesData);
        this.employees = employeesData;
        this.filteredEmployees = [...this.employees];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _employeesApi = inject(EmployeesApi);
  private _employeeServiceSubscription: Subscription;

  protected employees: Employee[] = [];

  protected selectedEmployeeId: number;
  protected onEmployeeSelection(id: number): void {
    this.selectedEmployeeId = id;
  }

  protected childMsg: string;
  protected handleChildMsg(msg: string): void {
    this.childMsg = msg;
  }

  protected searchChars: string = '';
  protected filteredEmployees: Employee[] = [...this.employees];

  protected searchEvents(): void {
    this.pageNumberEmp = 1;

    if (!this.searchChars || this.searchChars == '') {
      console.log(this.searchChars);
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter((employee) =>
        employee.employeeName.toLocaleLowerCase().includes(this.searchChars.toLocaleLowerCase())
      );
      console.log(this.filteredEmployees);
    }
  }

  protected pageNumberEmp: number = 1;
  protected pageSizeEmp: number = 2;

  ngOnDestroy(): void {
    if (this._employeeServiceSubscription) {
      this._employeeServiceSubscription.unsubscribe();
    }
  }
}
