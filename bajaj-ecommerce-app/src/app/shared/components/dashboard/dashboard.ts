import { Component } from '@angular/core';
import { SideBar } from '../side-bar/side-bar';
import { Banner } from '../banner/banner';
import { ProductsList } from '../../../features/products/components/products-list/products-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'bajaj-dashboard',
  imports: [SideBar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
