export function determineSuccess(object: any) {
  if (object.affected == 0) {
    return { success: 'no' };
  } else {
    return { success: 'yes' };
  }
}
