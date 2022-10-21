// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function determineSuccess(object: any) {
  if (object.affected == 0) {
    return false;
  } else {
    return true;
  }
}
