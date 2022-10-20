import { google } from 'googleapis';
import { config } from 'dotenv';
import { ReservationEntity } from 'db';

config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS!);
const CALENDAR_ID = process.env.CALENDAR_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: 'v3' });

const AUTH = new google.auth.JWT(
  CREDENTIALS.client_email,
  undefined,
  CREDENTIALS.private_key,
  SCOPES
);

const TIMEOFFSET = '+02:00';

export class GoogleCalendarService {
  constructor() {}

  dateTimeForCalendar(inputDate: string) {
    let date: string = new Date(inputDate).toISOString();
    let event = new Date(Date.parse(date));
    let startDate = new Date(new Date(event).setHours(event.getHours() + 8));
    let endDate = new Date(new Date(event).setHours(event.getHours() + 20));
    return {
      start: startDate,
      end: endDate,
    };
  }

  async insertEvent(reservation: ReservationEntity) {
    try {
      let date;
      let response = await calendar.events.insert({
        auth: AUTH,
        calendarId: CALENDAR_ID
      });
    } catch {}
  }
}
