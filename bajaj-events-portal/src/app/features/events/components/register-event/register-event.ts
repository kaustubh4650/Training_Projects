import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { EventRegistration } from '../../models/event-registration';
import { EventsApi } from '../../service/events-api';

@Component({
  selector: 'app-register-event',
  imports: [ReactiveFormsModule],
  templateUrl: './register-event.html',
  styleUrl: './register-event.css',
})
export class RegisterEvent {
  protected title: string = 'Register New Bajaj Event!';
  protected register: EventRegistration = new EventRegistration();
  private _eventsApi = inject(EventsApi);
  private _router = inject(Router);
  private _eventsApiSubscription: Subscription;

  protected onEventSubmit(): void {
    this._eventsApiSubscription = this._eventsApi
      .sheduleNewEvent(this.register.eventForm.value)
      .subscribe({
        next: (data) => {
          if (data.acknowledged === true) {
            this._router.navigate(['/events']);
          }
        },
      });
  }

  ngOnDestroy(): void {
    if (this._eventsApiSubscription) {
      this._eventsApiSubscription.unsubscribe();
    }
  }
}
