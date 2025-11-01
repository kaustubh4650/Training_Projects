import { Routes } from '@angular/router';
import { Login } from './components/login/login/login';
import { Register } from './components/register/register/register';

export const SecurityRoutes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },

  {
    path: 'register',
    component: Register,
    title: 'Register',
  },
];
