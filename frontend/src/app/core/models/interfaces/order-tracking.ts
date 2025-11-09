import { Observable } from 'rxjs';
import { OrderTrackingStatus } from '../order-tracking-status';

export interface IOrderTrackingService {
  trackPreparation(orderId: string, pollIntervalMs: number): Observable<number>;

  trackGroupPreparation(
    groupId: number,
    pollIntervalMs: number
  ): Observable<number>;
}
