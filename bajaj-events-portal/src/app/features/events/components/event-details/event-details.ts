import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Event } from '../../models/event';
import { CommonModule } from '@angular/common';
import { EventsApi } from '../../service/events-api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails implements OnDestroy {
  private _eventsApi = inject(EventsApi);
  private _eventsApiSubscription: Subscription;

  protected title: string = `Details of : `;
  protected event: Event;
  // @Input() eventId: number;
  // @Input() subTitle: string;
  // @Output() sendConfirmationMessage: EventEmitter<string> = new EventEmitter<string>();
  private _activatedRoute = inject(ActivatedRoute);

  // protected onEventProcess(): void {
  //   this.sendConfirmationMessage.emit(
  //     `Event ${this.event.eventName} has been processed and stored in Oracle Db!`
  //   );
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  //   this._eventsApiSubscription = this._eventsApi.getEventDetails(this.eventId).subscribe({
  //     next: (data) => (this.event = data),
  //     error: (err) => console.log(err),
  //   });
  // }

  ngOnInit(): void {
    let eventId = this._activatedRoute.snapshot.params['id'];
    this._activatedRoute.data.subscribe({
      next: (data) => console.log(data),
    });

    this._eventsApiSubscription = this._eventsApi.getEventDetails(eventId).subscribe({
      next: (data) => (this.event = data),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    if (this._eventsApiSubscription) {
      this._eventsApiSubscription.unsubscribe();
    }
  }
}
