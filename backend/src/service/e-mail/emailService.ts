import sgMail = require('@sendgrid/mail');
import { UserEntity } from 'db';
import { config } from 'dotenv';
import logger from '../../logger';

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
sgMail.setSubstitutionWrappers('{{', '}}');

const mail = process.env.MAIL!;

export class EmailService {
  constructor() {}

  sendMail(user: UserEntity) {
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
}
