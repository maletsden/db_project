export function getTodayDataFormatted({changeDay = 0, changeMonth = 0, changeYear = 0}) {
  const today = new Date();

  const dd = today.getDate() + changeDay;
  const mm = today.getMonth() + 1 + changeMonth;
  const yyyy = today.getFullYear() + changeYear;

  return `${yyyy}-${mm < 10 ? '0' : ''}${mm}-${dd < 10 ? '0' : ''}${dd}`;
}

export function getTodayStandard() {
  const theMonths = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const today = new Date();

  const dd = today.getDate();
  const mm = today.getMonth();
  const yyyy = today.getFullYear();

  return `${dd} ${theMonths[mm]}, ${yyyy}`;

}
