/**
 * Converts a Date Object to a UNIX timestamp.
 * @param {Date} date - The Date Object to be converted.
 * @returns {number} The corresponding UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC).
 */
export const convertDateToUnixTimestamp = (date) => {
  if (!(date instanceof Date)) {
    throw new TypeError('Expected a Date object');
  }
  return Math.floor(date.getTime() / 1000);
};

/**
 * Converts a UNIX timestamp to a Date object formatted as a string.
 * @param {number} unixTimestamp - UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC).
 * @param {string} [locale='en-US'] - The locale to use for formatting the date (optional).
 * @param {Intl.DateTimeFormatOptions} [options={}] - Options for formatting the date (optional).
 * @returns {string} The corresponding Date formatted as a string.
 */
export const convertUnixTimestampToDate = (unixTimestamp, locale = 'en-US', options = {}) => {
  if (typeof unixTimestamp !== 'number' || unixTimestamp < 0) {
    throw new TypeError('Expected a positive number as UNIX timestamp');
  }
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds).toLocaleDateString(locale, options);
};

/**
 * Creates a new date by adding days/weeks/months/years to a given date. Negative values will also work (for past dates).
 * @param {Date} date - The specified date.
 * @param {number} [days=0] - The number (integer) of days to be added/subtracted (default is 0).
 * @param {number} [weeks=0] - The number (integer) of weeks to be added/subtracted (default is 0).
 * @param {number} [months=0] - The number (integer) of months to be added/subtracted (default is 0).
 * @param {number} [years=0] - The number (integer) of years to be added/subtracted (default is 0).
 * @returns {Date} The new date.
 */
export const createDate = (date, days = 0, weeks = 0, months = 0, years = 0) => {
  if (!(date instanceof Date)) {
    throw new TypeError('Expected a Date object');
  }
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};
