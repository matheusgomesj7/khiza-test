export const dateToUnix = (date) => {
  return Math.floor(new Date(date).getTime() / 1000);
};
