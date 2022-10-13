import logger from '../logger';
import { ObjectPropertiesSchema, ValidationError } from 'joi';

export async function validateInput(
  schema: ObjectPropertiesSchema,
  input: any
): Promise<boolean> {
  try {
    await schema.validateAsync(input);
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error(error);
      return false;
    }
  }
  return true;
}
