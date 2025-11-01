import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { Event } from '../models/event';

@Directive({
  selector: '[appEventCard]',
})
export class EventCard {
  @Input() event: Event;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #ccc');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'margin', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', '2px 2px 12px rgba(0, 0, 0, 0.1)');

    const logo = this.renderer.createElement('img');
    this.renderer.setAttribute(logo, 'src', this.event.logo);
    this.renderer.setStyle(logo, 'width', '50px');
    this.renderer.setStyle(logo, 'height', '50px');
    this.renderer.appendChild(this.el.nativeElement, logo);

    const title = this.renderer.createElement('h3');
    const titleText = this.renderer.createText(this.event.eventName);
    this.renderer.appendChild(title, titleText);
    this.renderer.appendChild(this.el.nativeElement, title);

    const description = this.renderer.createElement('p');
    const descriptionText = this.renderer.createText(this.event.description);
    this.renderer.appendChild(description, descriptionText);
    this.renderer.appendChild(this.el.nativeElement, description);

    const dates = this.renderer.createElement('p');
    const dateText = this.renderer.createText(
      `From ${this.event.startDate.toString()} to ${this.event.endDate.toString()}`
    );
    this.renderer.appendChild(dates, dateText);
    this.renderer.appendChild(this.el.nativeElement, dates);

    const fees = this.renderer.createElement('p');
    const feesText = this.renderer.createText(`Fees: ₹${this.event.fees}`);
    this.renderer.appendChild(fees, feesText);
    this.renderer.appendChild(this.el.nativeElement, fees);
  }
}
