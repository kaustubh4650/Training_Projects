import { Component, signal } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'bajaj-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('bajaj-ecommerce-app');
}
