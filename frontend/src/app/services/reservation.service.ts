import { Injectable } from '@angular/core';
import { Reservation } from '../helpingHand/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  addReservation(resData: Reservation): Observable<any> {
    const path = `http://localhost:8080/api/reservation/new`;
    return this.http.post<Reservation>(path, {
      user_id: resData.user_id,
      seat_id: resData.seat_id,
      reservation_date: resData.reservation_date,
    });
  }

  deleteReservation(resId: number): Observable<any> {
    console.log(`service called, id ${resId}`);
    const path = `http://localhost:8080/api/reservation/${resId}/delete`;
    return this.http.delete<any>(path);
  }
}
