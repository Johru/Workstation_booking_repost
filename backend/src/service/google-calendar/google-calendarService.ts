import { google } from 'googleapis';
import config from '../../config';
import { ReservationEntity } from '../../db';
import logger from '../../logger';

const CREDENTIALS = JSON.parse(config.credentials!);
const CALENDAR_ID = config.calendarId;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: 'v3' });

const AUTH = new google.auth.JWT(
  CREDENTIALS.client_email,
  undefined,
  CREDENTIALS.private_key,
  SCOPES
);

export class GoogleCalendarService {
  constructor() {}

  dateTimeForCalendar(inputDate: Date) {
    let date: string = new Date(inputDate).toISOString();
    let event = new Date(Date.parse(date));
    let startDate = new Date(
      new Date(event).setHours(event.getHours() + 6)
    ).toISOString();
    let endDate = new Date(
      new Date(event).setHours(event.getHours() + 16)
    ).toISOString();
    return {
      start: startDate,
      end: endDate,
    };
  }

  async insertEvent(reservation: ReservationEntity) {
    const building = reservation.seat?.workstation?.floor?.building!;
    const event: any = {
      summary: `Reservation ${reservation.reservation_id} on Drudge House`,
      location: `${building.building_address}, ${building.building_city}, ${building.building_country}`,
      description: `Reservation in ${reservation.seat?.workstation?.workstation_name}, ${building.building_name}.`,
      creator: {
        email: process.env.MAIL,
        displayName: 'Drudge House',
      },
      start: {
        dateTime: this.dateTimeForCalendar(reservation.reservation_date!).start,
      },
      end: {
        dateTime: this.dateTimeForCalendar(reservation.reservation_date!).end,
      },
      sendUpdates: 'all',
      sendNotifications: true,
      attendees: [
        {
          email: `${reservation.user?.user_email}`,
          displayName: `${reservation.user?.user_name}`,
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    calendar.events
      .insert({
        auth: AUTH,
        calendarId: CALENDAR_ID!,
        requestBody: event,
      })
      .then((event: any) => logger.info(`${event.statusText}`))
      .catch((err: any) =>
        logger.error(`Error Occured on creating Google Calendar Event. ${err}`)
      );
  }

  async getEvents(date: Date) {
    try {
      const response = await calendar.events.list({
        auth: AUTH,
        calendarId: CALENDAR_ID,
        timeMin: this.dateTimeForCalendar(date).start,
        timeMax: this.dateTimeForCalendar(date).end,
      });
      const list = response['data']['items'];
      return list;
    } catch (err) {
      logger.error(`Error at getEvents. ${err}`);
    }
  }

  findEventId(list: any[], id: number) {
    for (let item of list) {
      let reservationId = item.summary.split(' ')[1];
      if (reservationId == id) {
        return item.id;
      }
    }
    return undefined;
  }

  async deleteEvent(eventId: string) {
    if (eventId) {
      try {
        const response = await calendar.events.delete({
          auth: AUTH,
          calendarId: CALENDAR_ID,
          eventId: eventId,
        });
        if (response.data == null) {
          logger.info('Event deleted successfully.');
          return;
        } else {
          logger.error('Error in deleting event');
          return;
        }
      } catch (err: any) {
        logger.error(`Error at deleteEvent ===> ${err}`);
        return;
      }
    }
  }
}
