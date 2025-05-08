
import moment from "moment-timezone";

// Format the date in 'MMM DD' format
// export const formatDate = (timestamp) => {
//   // Ensure the timestamp is treated as UTC
//   return moment.utc(timestamp).format('MMM DD');
// };
export const formatDate = (timestamp) => {
  return moment(timestamp).format('MMM DD');
};
// Format the time according to the user's local timezone
export const formatTimeInTimezone = (timestamp) => {
  // Automatically get the user's local timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convert the timestamp to UTC and then to the user's local timezone
  return moment.utc(timestamp).tz(userTimezone).format('hh:mm A');
};
