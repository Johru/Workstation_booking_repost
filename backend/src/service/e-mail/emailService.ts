import { Client } from '@sendgrid/client';
import { EmailData } from '@sendgrid/helpers/classes/email-address';
import sgMail = require('@sendgrid/mail');
import { config } from 'dotenv';
import { toNamespacedPath } from 'path';
const dirpath = require('path');
const envpath = dirpath.join(__dirname, '../.env');

config();

sgMail.setClient(new Client());

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

sgMail.setSubstitutionWrappers('{{', '}}');

const mail = process.env.MAIL!;

export class EmailService {
  consructor() {}
}
