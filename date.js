const days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function timeFormating(time) {
  return time < 10 ? `0${time}` : `${time}`;
}
function timeProvider() {
  let meriduim = "";
  const date = new Date();
  const seconds = timeFormating(date.getSeconds());
  const minutes = timeFormating(date.getMinutes());
  let house = date.getHours();
  meriduim = house >= 12 ? "PM" : "AM";
  house = house % 12 || 12;
  house = timeFormating(house);
  return `${house}:${minutes}:${seconds} ${meriduim}`;
}

function dateProvider() {
  const date = new Date();
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

module.exports = { timeProvider, dateProvider };
