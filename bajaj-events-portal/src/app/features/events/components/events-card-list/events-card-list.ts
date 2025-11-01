import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventCard } from '../../directives/event-card';
import { EventCountdown } from '../../directives/event-countdown';

import { Event } from '../../models/event';
import { EventBadge } from '../../directives/event-badge';

@Component({
  selector: 'app-events-card-list',
  imports: [CommonModule, EventCard, EventCountdown, EventBadge],
  templateUrl: './events-card-list.html',
  styleUrl: './events-card-list.css',
})
export class EventsCardList {
  events: Event[] = [
    {
      eventId: 1001,
      eventCode: 'SEMJQ3',
      eventName: 'Seminar on jQuery 3.x',
      description: 'Seminar will discuss all the new features of jQuery 3.x',
      startDate: new Date(),
      endDate: new Date(),
      fees: 800,
      seatsFilled: 70,
      logo: 'images/jq3.png',
    },
    {
      eventId: 1002,
      eventCode: 'SEMNG1',
      eventName: 'Seminar on Angular JS 1.5.x',
      description: 'Seminar will discuss all the new features of Angular JS 1.5.x',
      startDate: new Date(),
      endDate: new Date(),
      fees: 600,
      seatsFilled: 50,
      logo: 'images/ng1.png',
    },
    {
      eventId: 1003,
      eventCode: 'SEMNG2',
      eventName: 'Seminar on Angular 2.x',
      description: 'Seminar will discuss all the new features of Angular 2.x',
      startDate: new Date(),
      endDate: new Date(),
      fees: 1000,
      seatsFilled: 80,
      logo: 'images/ng2.png',
    },
    {
      eventId: 1004,
      eventCode: 'SEMNG4',
      eventName: 'Seminar on Angular 4.x',
      description: 'Seminar will discuss all the new features of Angular 4.x',
      startDate: new Date(),
      endDate: new Date(),
      fees: 1000,
      seatsFilled: 76,
      logo: 'images/ng2.png',
    },
    {
      eventId: 1005,
      eventCode: 'SEMBS3',
      eventName: 'Seminar on Bootstrap 3.x',
      description: 'Seminar will discuss all the new features of Bootstrap 3.x',
      startDate: new Date(),
      endDate: new Date(),
      fees: 500,
      seatsFilled: 34,
      logo: 'images/bs3.png',
    },
  ];
}
