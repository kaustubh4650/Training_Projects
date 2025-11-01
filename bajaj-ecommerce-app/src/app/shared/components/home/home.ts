import { Component } from '@angular/core';
import { Slider } from '../slider/slider';
import { CategoriesLists } from '../../../features/categories/components/categories-lists/categories-lists';

@Component({
  selector: 'bajaj-home',
  imports: [Slider, CategoriesLists],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
