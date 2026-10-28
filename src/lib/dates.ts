const IT_DATE_FORMATTER = new Intl.DateTimeFormat('it-IT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Rome',
});

const IT_DATETIME_FORMATTER = new Intl.DateTimeFormat('it-IT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Rome',
});

export function formatDateIt(date: Date): string {
  return IT_DATE_FORMATTER.format(date);
}

export function formatDateTimeIt(date: Date): string {
  return IT_DATETIME_FORMATTER.format(date);
}
