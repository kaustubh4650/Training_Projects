import { Directive, ElementRef, Input, Renderer2, OnInit, inject } from '@angular/core';
import { Event } from '../models/event';

@Directive({
  selector: '[appEventCountdown]',
})
export class EventCountdown implements OnInit {
  @Input() event: Event;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000); // Update every second
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const eventTime = new Date(this.event.startDate).getTime();
    const distance = eventTime - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    this.el.nativeElement.innerText = `Starts in: ${countdownText}`;
  }
}
