import sgMail = require('@sendgrid/mail');
import { ReservationEntity, UserEntity } from 'db';
import { config } from 'dotenv';
import logger from '../../logger';

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
sgMail.setSubstitutionWrappers('{{', '}}');

const mail = process.env.MAIL!;

export class EmailService {
  constructor() {}

  sendWelcomeMail(user: UserEntity) {
    const msg = {
      to: user.user_email,
      from: mail,
      templateId: 'd-f19a565bef2447e68b3d43ca33a0e2f3',
      dynamicTemplateData: {
        name: user.user_name,
        login: user.user_login,
      },
    };

    sgMail
      .send(msg)
      .then(() => {
        logger.info(`Email to ${user.user_email} sent.`);
      })
      .catch((error: Error) => {
        logger.error(error);
      });
  }

  sendSuccessfullReservation(reservation: ReservationEntity) {
    const msg = {
      to: reservation.user!.user_email,
      from: mail,
      templateId: 'd-9574c607bb36401c9e4b92567c60a623',
      dynamicTemplateData: {
        name: reservation.user!.user_name,
        city: reservation.seat?.workstation?.floor?.building?.building_city,
        address:
          reservation.seat?.workstation?.floor?.building?.building_address,
        buildingName:
          reservation.seat?.workstation?.floor?.building?.building_name,
        floorName: reservation.seat?.workstation?.floor?.floor_name,
        workstationName: reservation.seat?.workstation?.workstation_name,
        seatId: reservation.seat_id,
        date: reservation.reservation_date,
      },
    };
    sgMail
      .send(msg)
      .then(() => {
        logger.info(
          `Confirmed reservation email sent to ${reservation.user!.user_email}.`
        );
      })
      .catch((error: Error) => {
        logger.error(error);
      });
  }
}
