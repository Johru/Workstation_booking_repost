function dateTimeForCalendar(inputDate: string) {
  let date: string = new Date(inputDate).toISOString();
  let event = new Date(Date.parse(date));
  let startDate = new Date(new Date(event).setHours(event.getHours() + 8));
  let endDate = new Date(new Date(event).setHours(event.getHours() + 20));
  return {
    start: startDate,
    end: endDate,
  };
}

console.log(dateTimeForCalendar('2022-10-10'));
