import logger from '../logger';
import { determineSuccess } from './determineSuccess';

export function logErrorAndReturnYesOrNo(
  action: object,
  entity: string,
  data?: any
) {
  if (!determineSuccess(action)) {
    logger.error(`${entity} with this id doesn't exist`);
    return { success: 'no' };
  }
  return { success: 'yes', data: data };
}
