import { Routes } from '@angular/router';
import { EmployeesList } from './components/employees-list/employees-list';

export const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeesList,
    title: 'Employee List',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register-employee/register-employee').then((ed) => ed.RegisterEmployee),
    title: 'Employee Registeration',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/employee-details/employee-details').then((ed) => ed.EmployeeDetails),
    title: 'Employee Details',
  },
];
