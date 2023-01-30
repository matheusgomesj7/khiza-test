  // # The new Date() only accept dates in the American format
  // MM/DD/YYYY, so this function not only turns a date to unix,
  // but before doing it, it turns the Brazilian date to an
  // American date
export const dateToUnix = (date) => {
  const dateArray = date.split('/');
  const day = dateArray[0];
  const month = dateArray[1];
  const year = dateArray[2];
  const americanDate = `${month}/${day}/${year}`;

  return Math.floor(new Date(americanDate).getTime() / 1000);
};

// # Today's date is useful so we can prevent the user
// from sending an unecessary request if he types a date
// bigger than today's one
export const todayDate = () => {
  const today = new Date();
  const unix = today.getTime() / 1000;
  return unix.toFixed(0);
};

// # Bitcoin first mining date (3rd of dec of 2009) in unix
export const bitcoinCreationDate = 1230948000;