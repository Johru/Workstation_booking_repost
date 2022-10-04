import logger from '../logger';
import { ValidationError } from 'joi';
export async function yesOrNo(schema: any, value: any): Promise<boolean> {
  try {
    const requestDataValidation = await schema.validateAsync(value);
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error(error);
      return false;
    }
  }
  return true;
}
