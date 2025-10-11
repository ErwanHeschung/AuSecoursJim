import { Injectable, OnDestroy } from '@angular/core';
import { IOrderTrackingService } from '../../../core/models/interfaces/order-tracking';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderTrackingServiceBFF
  implements IOrderTrackingService, OnDestroy
{
  private socket: Socket;
  private bffUrl: string = environment.apiUrl;

  constructor() {
    this.socket = io(this.bffUrl);
  }

  public trackPreparation(orderId: string): Observable<number> {
    return new Observable<number>(observer => {
      this.socket.emit('subscribeOrder', orderId);

      const listener = (data: { progress: number }) => {
        observer.next(data.progress);
      };

      this.socket.on('orderUpdate', listener);

      return () => {
        this.socket.off('orderUpdate', listener);
      };
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
