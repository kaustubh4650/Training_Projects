import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../../models/event';
import { EventDetails } from '../event-details/event-details';
import { CommonModule } from '@angular/common';
import { DateGlobalizationPipe } from '../../../../shared/pipes/date-globalization-pipe';
import { LowercaseTruncPipe } from '../../../../shared/pipes/lowercase-trunc-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventsApi } from '../../service/events-api';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.html',
  styleUrl: './events-list.css',
  imports: [
    // EventDetails,
    CommonModule,
    DateGlobalizationPipe,
    LowercaseTruncPipe,
    FormsModule,
    NgxPaginationModule,
    RouterLink,
  ],
})
export class EventsList implements OnInit, OnDestroy {
  protected role: string | null;

  ngOnInit(): void {
    if (this.role === 'Employee') {
      this.columns = this.columns.filter((col) => col !== 'Cancel Event');
    }

    this.role = localStorage.getItem('role');
    this._eventServiceSubscription = this._eventsApi.getAllEvents().subscribe({
      next: (eventsData) => {
        console.log(eventsData);
        this.events = eventsData;
        this.filteredEvents = [...this.events];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _eventsApi = inject(EventsApi);
  private _eventServiceSubscription: Subscription;

  protected title: string = 'Bajaj Finserv Events List !';
  protected subTitle: string = 'Published by Bajaj Finserv Hr Deepartment!';

  protected columns: string[] = [
    'Event Code',
    'Event Name',
    'Start Date',
    'Fees',
    'Show Details',
    'Cancel Event',
  ];

  protected events: Event[];
  // protected selectedEvent: Event;

  // protected selectedEventId: number;
  // protected onEventSelection(id: number): void {
  //   this.selectedEventId = id;
  // }

  protected childMessage: string;
  protected handleChildMessage(message: string): void {
    this.childMessage = message;
  }

  protected searchChars: string = '';
  protected filteredEvents: Event[];

  protected searchEvents(): void {
    if (!this.searchChars || this.searchChars == '') {
      if (this.temp == 0) {
        this.pageNumber = 1;
      } else {
        this.pageNumber = this.temp;
        this.temp = 0;
      }
      console.log(this.searchChars);
      this.filteredEvents = this.events;
    } else {
      if (this.searchChars.length == 1 && this.temp == 0) {
        this.temp = this.pageNumber;
      }
      this.pageNumber = 1;
      this.filteredEvents = this.events.filter((event) =>
        event.eventName.toLocaleLowerCase().includes(this.searchChars.toLocaleLowerCase())
      );
      console.log(this.filteredEvents);
    }
  }

  protected pageNumber: number = 1;
  protected pageSize: number = 2;
  private temp: number = 0;

  ngOnDestroy(): void {
    if (this._eventServiceSubscription) {
      this._eventServiceSubscription.unsubscribe();
    }
  }
}
