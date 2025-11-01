import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { Event } from '../models/event';

@Directive({
  selector: '[appEventBadge]',
})
export class EventBadge {
  @Input() event: Event;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const today = new Date();
    const badge = this.renderer.createElement('span');
    let badgeText;

    if (this.event.startDate > today) {
      badgeText = this.renderer.createText('Upcoming');
      this.renderer.setStyle(badge, 'backgroundColor', 'blue');
    } else if (this.event.seatsFilled >= 70) {
      // Assume 100 is the total seats
      badgeText = this.renderer.createText('Sold Out');
      this.renderer.setStyle(badge, 'backgroundColor', 'red');
    } else {
      badgeText = this.renderer.createText('Ongoing');
      this.renderer.setStyle(badge, 'backgroundColor', 'green');
    }

    this.renderer.setStyle(badge, 'color', 'white');
    this.renderer.setStyle(badge, 'padding', '5px 10px');
    this.renderer.setStyle(badge, 'borderRadius', '5px');

    this.renderer.appendChild(badge, badgeText);
    this.renderer.appendChild(this.el.nativeElement, badge);
  }
}
