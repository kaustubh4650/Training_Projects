import { Routes } from '@angular/router';
import { EpHome } from './features/home/ep-home/ep-home';
import { EmployeesList } from './features/employees/components/employees-list/employees-list';
import { Login } from './features/security/components/login/login';

import { ResourceNotFound } from './shared/components/resource-not-found/resource-not-found';
import { EmployeeForbiddenAccess } from './shared/components/employee-forbidden-access/employee-forbidden-access';

import { eventsRoutes } from './features/events/events.routes';
import { employeesRoutes } from './features/employees/employee.routes';
import { SecurityRoutes } from './features/security/security.routes';

export const routes: Routes = [
  {
    path: '',
    component: EpHome,
    title: 'Bajaj EP Home',
  },
  {
    path: 'home',
    component: EpHome,
    title: 'Bajaj EP Home',
  },
  {
    path: 'employees',
    children: [...employeesRoutes],
  },
  {
    path: 'events',
    children: [...eventsRoutes],
  },

  {
    path: 'login',
    children: [...SecurityRoutes],
  },

  {
    path: 'forbidden-access',
    component: EmployeeForbiddenAccess,
    title: 'Access Denied',
  },

  {
    path: '**',
    component: ResourceNotFound,
    title: 'Not Found - 404',
  },
];
