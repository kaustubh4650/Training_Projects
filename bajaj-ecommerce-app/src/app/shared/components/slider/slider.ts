import { Component } from '@angular/core';

@Component({
  selector: 'bajaj-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {
  images = ['images/car-1.jpg', 'images/car-2.jpg', 'images/car-3.jpg', 'images/car-4.jpg'];

  currentIndex = 0;

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // Optional: auto-slide every 3 seconds
  constructor() {
    setInterval(() => this.next(), 3000);
  }
}
